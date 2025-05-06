import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useCart } from '@/app/context/CartContext';
import { useDomain } from '@/app/context/DomainContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ProductPage from './page';


// Mock dos hooks e módulos
jest.mock('@tanstack/react-query');
jest.mock('@/app/context/CartContext');
jest.mock('@/app/context/DomainContext');
jest.mock('next/navigation');
// No seu arquivo de configuração de testes ou diretamente no teste
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Garante que o texto alternativo seja fornecido
    const alt = props.alt || ''; // Padrão para string vazia se não fornecido
    return <img {...props} alt={alt} />;
  },
}));

const mockUseQuery = useQuery as jest.Mock;
const mockUseCart = useCart as jest.Mock;
const mockUseDomain = useDomain as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;


describe("ProductPage Component", () => {
  const mockAddToCart = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    mockUseCart.mockReturnValue({
      addToCart: mockAddToCart,
    });

    mockUseDomain.mockReturnValue({
      storeData: {
        subdomain: 'test-store',
      },
    });

    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when data is not available', () => {
    mockUseQuery.mockReturnValue({ data: null, isLoading: true });

    render(<ProductPage params={Promise.resolve({ id: '123' })} />);
    expect(screen.queryByText('Adicionar ao carrinho')).not.toBeInTheDocument();
  });

  it('should render product details when data is available', async () => {
    const mockProduct = {
      id: '123',
      name: 'Test Product',
      brand: 'Test Brand',
      imgUrl: '/test-image.jpg',
      quantity: 10,
      normalPrice: 100,
    };

    mockUseQuery.mockReturnValue({
      data: {
        data: {
          product: mockProduct,
          customPrice: 90,
          quantity: 10,
        },
      },
      isLoading: false,
    });

    render(<ProductPage params={Promise.resolve({ id: '123' })} />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
      expect(screen.getByText(`Estoque disponivel: ${mockProduct.quantity}`)).toBeInTheDocument();
      expect(screen.getByText('R$ 90,00')).toBeInTheDocument();
      expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
      expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
    });
  });

  it('should show discount when discountValue is available', async () => {
    const mockProduct = {
      id: '123',
      name: 'Test Product',
      brand: 'Test Brand',
      imgUrl: '/test-image.jpg',
      quantity: 10,
      normalPrice: 100,
    };

    mockUseQuery.mockReturnValue({
      data: {
        data: {
          product: mockProduct,
          customPrice: 80,
          discountValue: 20,
          quantity: 10,
        },
      },
      isLoading: false,
    });

    render(<ProductPage params={Promise.resolve({ id: '123' })} />);

    await waitFor(() => {
      expect(screen.getByText('20% OFF')).toBeInTheDocument();
      expect(screen.getByText('R$ 80,00')).toBeInTheDocument();
      expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    });
  });

  it('should show out of stock message when quantity is 0', async () => {
    const mockProduct = {
      id: '123',
      name: 'Test Product',
      brand: 'Test Brand',
      imgUrl: '/test-image.jpg',
      quantity: 0,
      normalPrice: 100,
    };

    mockUseQuery.mockReturnValue({
      data: {
        data: {
          product: mockProduct,
          customPrice: 100,
          quantity: 0,
        },
      },
      isLoading: false,
    });

    render(<ProductPage params={Promise.resolve({ id: '123' })} />);

    await waitFor(() => {
      expect(screen.getByText('Produto esgotado')).toBeInTheDocument();
      expect(screen.getByText('Sem estoque')).toBeInTheDocument();
      expect(screen.getByText('Sem estoque')).toBeDisabled();
    });
  });

  it('should call addToCart and navigate to cart when button is clicked', async () => {
    const mockProduct = {
      id: '123',
      name: 'Test Product',
      brand: 'Test Brand',
      imgUrl: '/test-image.jpg',
      quantity: 10,
      normalPrice: 100,
    };

    mockUseQuery.mockReturnValue({
      data: {
        data: {
          product: mockProduct,
          customPrice: 90,
          quantity: 10,
        },
      },
      isLoading: false,
    });

    render(<ProductPage params={Promise.resolve({ id: '123' })} />);

    await waitFor(() => {
      const button = screen.getByText('Adicionar ao carrinho');
      fireEvent.click(button);

      expect(mockAddToCart).toHaveBeenCalledWith({
        id: mockProduct.id,
        quantity: 1,
        imgUrl: mockProduct.imgUrl,
        name: mockProduct.name,
        value: 90,
        quantityInStock: 10,
      });

      expect(mockRouterPush).toHaveBeenCalledWith('/cart');
    });
  });

  it('should not render when product is not available', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { container } = render(<ProductPage params={Promise.resolve({ id: '123' })} />);
    expect(container.firstChild).toBeNull();
  });
})