import { IDepartment, IMeta } from "@/types"
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const DEPARTMENT_URL = '/management-departments'

const departmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        departments: build.query({
            query: (arg: Record<string, any>) => ({
                url: DEPARTMENT_URL,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IDepartment, meta: IMeta) => {
                return {
                    departments: response,
                    meta
                }
            },
            providesTags: [tagTypes.depatment]
        }),
        addDepartment: build.mutation({
            query: (data) => ({
                url: DEPARTMENT_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.depatment]
        }),
        getSingleDepartment: build.query({
            query: (id) => ({
                url: `${DEPARTMENT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.depatment]
        }),
        updateDepartment: build.mutation({
            query: (data) => ({
                url: `${DEPARTMENT_URL}/${data.id}`,
                method: 'PATCH',
                data: data.body
            }),
            invalidatesTags: [tagTypes.depatment]
        }),
        deleteDepartment: build.mutation({
            query: (id) => ({
                url: `${DEPARTMENT_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.depatment]
        })
    }),
})

export const { useAddDepartmentMutation, useDepartmentsQuery, useDeleteDepartmentMutation, useGetSingleDepartmentQuery, useUpdateDepartmentMutation } = departmentApi;