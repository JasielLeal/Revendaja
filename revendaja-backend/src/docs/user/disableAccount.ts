/**
 * @swagger
 * /user/DisableAccount:
 *   put:
 *     summary: Desabilita a conta do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta desabilitada com sucesso
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */