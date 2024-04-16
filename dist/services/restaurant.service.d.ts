export declare const getAll: () => Promise<({
    contacts: {
        id: number;
        number: string;
        restaurant_id: number;
    }[];
} & {
    id: number;
    name: string;
    description: string;
    address: string;
})[]>;
export declare const create: (body: any, user_id: number) => Promise<{
    id: number;
    name: string;
    description: string;
    address: string;
}>;
export declare const update: (id: number, body: any) => Promise<{
    id: number;
    name: string;
    description: string;
    address: string;
}>;
export declare const remove: (id: Number) => Promise<{
    id: number;
    name: string;
    description: string;
    address: string;
}>;
export declare const findOne: (id: number) => Promise<{
    id: number;
    name: string;
    description: string;
    address: string;
}>;
//# sourceMappingURL=restaurant.service.d.ts.map