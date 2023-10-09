import { IMeta } from "@/types"
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const FACULTY_URL = '/faculties'

const facultyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        faculties: build.query({
            query: (arg: Record<string, any>) => ({
                url: FACULTY_URL,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    faculties: response,
                    meta
                }
            },
            providesTags: [tagTypes.faculty]
        }),
        addFaculty: build.mutation({
            query: (data) => ({
                url: '/users/create-faculty',
                method: 'POST',
                data: data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.faculty]
        }),
        getSingleFaculty: build.query({
            query: (id) => ({
                url: `${FACULTY_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.faculty]
        })

    }),
})

export const { useAddFacultyMutation, useFacultiesQuery, useGetSingleFacultyQuery } = facultyApi;   