/**
 * @swagger
 * /stripe/ReactiveSubscription:
 *   post:
 *     summary: Reativação de assinatura
 *     tags: [Stripe]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 example: sub_1RGkh92M4f5OsxL2YNf6F1tc
 *     responses:
 *       201:
 *         description: Assinatura reativada com sucesso
 *       400:
 *         description: Erro ao reativar assinatura
 */
