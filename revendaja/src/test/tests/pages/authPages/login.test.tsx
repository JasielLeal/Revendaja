import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AuthContext, { AuthProvider } from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import * as SessionModule from '@/pages/authPages/login/services/Session';


// Componente de teste que dispara o login
const TestComponent = ({ email, password }: { email: string; password: string }) => {
    const { singInFc } = useContext(AuthContext);

    React.useEffect(() => {
        singInFc({ email, password });
    }, []);

    return null;
};

const queryClient = new QueryClient();

describe('AuthContext Integration', () => {
    beforeEach(async () => {
        await AsyncStorage.clear();
    });

    it('should sign in and save user/token', async () => {
        const email = 'jasieloficial@hotmail.com';
        const password = '123456';

        render(
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <AuthProvider>
                        <TestComponent email={email} password={password} />
                    </AuthProvider>
                </NavigationContainer>
            </QueryClientProvider>
        );

        // espera salvar no AsyncStorage
        await waitFor(async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            expect(token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiODAzOTI4LThlZjMtNGRhYi04MWFhLWJiMGQ5ODUyMDAyNCIsInJvbGUiOiJPd25lciIsImlhdCI6MTc0NzY1NzU4MSwiZXhwIjoxNzQ3Njg2MzgxfQ.0flRTKKrYUe9MRkijD356fI2JWCWrsO-DjBZ3kVvagc');
            expect(JSON.parse(user!)).toMatchObject({
                email: 'fakeuser@email.com',
                name: 'Jasiel',
            });
        });
    });
});
