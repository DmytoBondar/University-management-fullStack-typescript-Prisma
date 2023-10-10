import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IMeta } from "@/types";

const ACADAMIC_SEMESTER_URL = '/academic-semesters'

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        academicSemesters: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: ACADAMIC_SEMESTER_URL,
                    method: "GET",
                    params: arg
                }
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    academicSemesters: response,
                    meta
                }
            },
            providesTags: [tagTypes.academicSemester]
        }),
        addAcademicSemester: build.mutation({
            query: (data) => ({
                url: ACADAMIC_SEMESTER_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.academicSemester]
        }),
        getSingleAcademicSemester: build.query({
            query: (id) => ({
                url: `${ACADAMIC_SEMESTER_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.academicSemester]
        }),
        updateAcadmicSemester: build.mutation({
            query: (data) => ({
                url: `${ACADAMIC_SEMESTER_URL}/${data.id}`,
                method: 'PATCH',
                data: data.body
            }),
            invalidatesTags: [tagTypes.academicSemester]
        }),
        deleteAcademicSemester: build.mutation({
            query: (id) => ({
                url: `${ACADAMIC_SEMESTER_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.academicSemester]
        })
    }),
})
export const { useAcademicSemestersQuery, useAddAcademicSemesterMutation, useUpdateAcadmicSemesterMutation, useGetSingleAcademicSemesterQuery, useDeleteAcademicSemesterMutation } = academicSemesterApi;