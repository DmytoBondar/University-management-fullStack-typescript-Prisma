import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IMeta } from "@/types";

const ACADAMIC_DEPARTMENT_URL = '/academic-departments'

const academicDepartmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        academicDepartment: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: ACADAMIC_DEPARTMENT_URL,
                    method: "GET",
                    params: arg
                }
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    academicDepartment: response,
                    meta
                }
            },
            providesTags: [tagTypes.academicDepartment]
        }),
        addAcademicDepartment: build.mutation({
            query: (data) => ({
                url: ACADAMIC_DEPARTMENT_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.academicFaculty]
        }),
        getSingleAcademicDepartment: build.query({
            query: (id) => ({
                url: `${ACADAMIC_DEPARTMENT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.academicDepartment]
        }),
        updateAcadmicDepartment: build.mutation({
            query: (data) => ({
                url: `${ACADAMIC_DEPARTMENT_URL}/${data.id}`,
                method: 'PATCH',
                data: data.body
            }),
            invalidatesTags: [tagTypes.academicDepartment]
        }),
        deleteAcademicDepartment: build.mutation({
            query: (id) => ({
                url: `${ACADAMIC_DEPARTMENT_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.academicDepartment]
        })
    }),
})

export const { useAcademicDepartmentQuery, useAddAcademicDepartmentMutation, useDeleteAcademicDepartmentMutation, useGetSingleAcademicDepartmentQuery } = academicDepartmentApi;