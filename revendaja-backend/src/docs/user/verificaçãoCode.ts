/**
 * @swagger
 * /user/verifyemail/:
 *   put:
 *     summary: Verificação de e-mail
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - email
 *             properties:
 *               code:
 *                 type: string
 *                 example: CA48E9
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       201:
 *         description: Usuário verificado com sucesso
 */
