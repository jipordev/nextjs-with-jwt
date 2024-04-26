import { ecommerceApi } from "../api";

export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        //                        <result type,         args type>
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `api/products/?page=${page}&page_size=${pageSize}`,
        }),
        // get single product
        getProductById: builder.query<any, number>({
            query: (id) => `api/products/${id}/`,
        }),
        // create a product
        createProduct: builder.mutation<any, { newProduct: object, accessToken: string }>({
            query: ({ newProduct, accessToken }) => ({
                url: "/api/products/",
                method: "POST",
                body: newProduct,
            }),
        }),
        // update a product
        updateProduct: builder.mutation<
            any,
            { id: number; updatedProduct: object;}>({
            query: ({ id, updatedProduct}) => ({
                url: `/api/products/${id}/`,
                method: "PATCH",
                body: updatedProduct,
            }),
        }),
        // delete a product
        deleteProduct: builder.mutation<any, { id: number; accessToken: string }>({
            query: ({ id, accessToken }) => ({
                url: `/api/products/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useCreateProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApi