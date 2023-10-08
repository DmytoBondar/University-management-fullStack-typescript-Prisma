import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IMeta } from "@/types";

const ACADAMIC_FACULTY_URL = '/academic-faculties'

const academicFacultyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        academicFaculty: build.query({
            query: (arg: Record<string, any>) => ({
                url: ACADAMIC_FACULTY_URL,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    academicfaculty: response,
                    meta
                }
            },
            providesTags: [tagTypes.academicFaculty]
        }),
        addAcademicFaculty: build.mutation({
            query: (data) => ({
                url: ACADAMIC_FACULTY_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.academicFaculty]
        }),
        getSingleAcademicFaculty: build.query({
            query: (id) => ({
                url: `${ACADAMIC_FACULTY_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.academicFaculty]
        }),
        updateAcadmicFaculty: build.mutation({
            query: (data) => ({
                url: `${ACADAMIC_FACULTY_URL}/${data.id}`,
                method: 'PATCH',
                data: data.body
            }),
            invalidatesTags: [tagTypes.academicFaculty]
        }),
        deleteAcademicFaculty: build.mutation({
            query: (id) => ({
                url: `${ACADAMIC_FACULTY_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.academicFaculty]
        })
    }),
})

export const { useAcademicFacultyQuery, useAddAcademicFacultyMutation, useDeleteAcademicFacultyMutation, useGetSingleAcademicFacultyQuery } = academicFacultyApi;