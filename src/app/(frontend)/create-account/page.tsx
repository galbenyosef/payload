'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import Section from '@/app/Components/Section'
import SectionHeading from '@/app/Components/SectionHeading'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../providers/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormData = {
  email: string
  password: string
  confirmPassword: string
  role: string
}

const formSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  role: yup.string().required().oneOf(['doctor', 'patient'], 'Role is required'),
})

const data = {
  sectionSubtitle: 'Create account',
  sectionTitle: 'Book appointments now!',
  roles: [
    { value: '', label: 'Choose Service' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'patient', label: 'Patient' },
  ],
  buttonText: 'Create account',
}

const Page = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data: FormData) => {
      /*     const response = await fetch(`/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }
 */
      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)

        clearTimeout(timer)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push(`/`)
        }
      } catch (_) {
        clearTimeout(timer)
        setLoading(false)

        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )
  return (
    <div>
      {/*      <Section
        className={'cs_page_heading cs_bg_filed cs_center'}
        backgroundImage="/assets/img/page_heading_bg.jpg"
      >
        <PageHeading data={headingData} />
      </Section> */}

      {/* Start Appointment Section */}
      <Section
        topSpaceLg="70"
        topSpaceMd="70"
        bottomSpaceLg="80"
        bottomSpaceMd="120"
        className="cs_appointment"
      >
        <div className="container">
          <div className="cs_appointment_form_wrapper">
            <SectionHeading
              SectionDescription={''}
              SectionSubtitle={data.sectionSubtitle}
              SectionTitle={data.sectionTitle}
              variant={'text-center'}
              textColor={undefined}
            />
            <div className="cs_height_40 cs_height_lg_35" />
            <form className="cs_appointment_form row cs_gap_y_30" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12">
                <input
                  className={
                    errors.email ? 'form-control cs_form_field is-invalid' : 'cs_form_field'
                  }
                  defaultValue={'test@example.com'}
                  placeholder="Email"
                  {...register('email', { required: true })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
              </div>

              <div className="col-md-12">
                <input
                  defaultValue={'test@example.com'}
                  className={
                    errors.password ? 'form-control cs_form_field is-invalid' : 'cs_form_field'
                  }
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
              </div>

              <div className="col-md-12">
                <input
                  defaultValue={'test@example.com'}
                  className={
                    errors.confirmPassword
                      ? 'form-control cs_form_field is-invalid mb-0'
                      : 'cs_form_field'
                  }
                  type="password"
                  placeholder="Password Confirm"
                  {...register('confirmPassword', { required: true })}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                {errors.confirmPassword?.type === 'required' && (
                  <p role="alert">Password confirm is required</p>
                )}
              </div>

              <div className="col-md-12">
                <select
                  className={
                    errors.role ? 'form-control cs_form_field is-invalid mb-0' : 'cs_form_field'
                  }
                  {...register('role')}
                >
                  {data.roles.map((role, index) => (
                    <option value={role.value} key={index}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role?.type === 'validate' && <p role="alert">Error</p>}
              </div>
              <div className="col-md-12">
                <button
                  disabled={loading}
                  type="submit"
                  className="cs_btn cs_style_1 cs_white_color"
                >
                  {loading ? 'Submitting...' : data.buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
      {/* End Appointment Section */}
    </div>
  )
}

export default Page
