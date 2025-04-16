export class FetchPublishableKeyUseCase {
  async execute() {
    return process.env.STRIPE_PK;
  }
}
