import z from "zod";

export const createProductSchema = z.object({

    id: z.string().uuid().optional(),

    nameClient: z.string().trim().min(1, {
        message: "O nome da cliente é obrigatório.",
    }),
    name: z.string().trim().min(1, {
        message: "O serviço é obrigatório.",
    }),
    price: z
        .number({ required_error: "O valor do serviço é obrigatório." })
        .min(0.01, "O valor deve ser maior que zero"),

    stock: z.number().min(0, {
        message: "A quantidade de procedimento deve ser positiva.",
    }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>