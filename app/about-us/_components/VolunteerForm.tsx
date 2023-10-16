'use client';

import { useToast } from '@/components/UI/use-toast';
import { countries } from '@/exports';
import { registerVolunteer, volunteer } from '@/lib/actions/user';
import {
  TextInput,
  Button,
  Group,
  Box,
  Textarea,
  Select,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconDownload } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
const data = [
  'Girl-Child Education',
  'Women Empowerment',
  'Outreach in Rural Communities',
  'Health and Wellbeing',
];
export default function VolunteerForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dob: null,
      address: '',
      skill: 'Girl-Child Education',
      country: '',
      reason: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstName: (value) =>
        value.length > 0 ? null : 'First name is required',
      lastName: (value) => (value.length > 0 ? null : 'Last name is required'),
      phoneNumber: (value) =>
        value.length > 0 ? null : 'Phone number is required',
      dob: (value) => value === null && 'Date of birth is required',
      address: (value) => (value.length > 0 ? null : 'Address is required'),
      skill: (value) => (value.length > 0 ? null : 'Skill is required'),
      country: (value) => (value.length > 0 ? null : 'Country is required'),
    },
  });
  const handleSubmit = async (values: volunteer) => {
    setLoading(true);
    try {
      await registerVolunteer(values);
      toast({
        variant: 'success',
        title: 'Welcome to Our Foundation',
        description: 'We are glad to have you as a volunteer',
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Something went wrong',
        description: 'error?.message',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={600} mx="auto" mt={50}>
      <form
        className="space-y-4"
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <>
          <TextInput
            label="First name"
            required
            withAsterisk
            {...form.getInputProps('firstName')}
            error={form.errors.firstName}
          />
          {form.errors.firstName && (
            <p className="text-red-500 font-semibold">
              {form.errors.firstName}
            </p>
          )}
        </>
        <>
          <TextInput
            label="Last name"
            required
            withAsterisk
            {...form.getInputProps('lastName')}
            error={form.errors.lastName}
          />
          {form.errors.lastName && (
            <p className="text-red-500 font-semibold">{form.errors.lastName}</p>
          )}
        </>
        <>
          <TextInput
            label="Email"
            required
            withAsterisk
            type="email"
            {...form.getInputProps('email')}
            error={form.errors.email}
          />
          {form.errors.email && (
            <p className="text-red-500 font-semibold">{form.errors.email}</p>
          )}
        </>
        <>
          <TextInput
            label="Phone number"
            required
            withAsterisk
            {...form.getInputProps('phoneNumber')}
          />
          {form.errors.address && (
            <p className="text-red-500 font-semibold">
              {form.errors.phoneNumber}
            </p>
          )}
        </>
        <>
          <DatePickerInput
            required
            withAsterisk
            {...form.getInputProps('dob')}
            label="Birth Date"
            placeholder="Date of birth"
            defaultValue={new Date()}
            allowDeselect={true}
          />
          {form.errors.dob && (
            <p className="text-red-500 font-semibold">{form.errors.dob}</p>
          )}
        </>
        <>
          <TextInput
            label="Address"
            required
            withAsterisk
            {...form.getInputProps('address')}
          />
          {form.errors.address && (
            <p className="text-red-500 font-semibold">{form.errors.address}</p>
          )}
        </>
        <>
          <Select
            required
            withAsterisk
            label="Please indicate areas to volunteer according to your skills"
            {...form.getInputProps('skill')}
            data={data}
            defaultValue="Girl-Child Education"
            allowDeselect
          />
          {form.errors.skill && (
            <p className="text-red-500 font-semibold">{form.errors.skill}</p>
          )}
        </>
        <>
          <Select
            required
            withAsterisk
            label="Country"
            {...form.getInputProps('country')}
            data={countries}
            allowDeselect
          />
          {form.errors.skill && (
            <p className="text-red-500 font-semibold">{form.errors.skill}</p>
          )}
        </>
        <Textarea
          label="Why do you want to be a volunteer?"
          placeholder="Describe"
          {...form.getInputProps('reason')}
        />

        <Group justify="center" mt="lg">
          <Button
            disabled={loading}
            type="submit"
            unstyled
            className="!bg-yellow-400 p-2 !rounded-md uppercase text-purple-900 font-semibold"
          >
            Volunteer now
          </Button>
        </Group>
      </form>

      <Group justify="center" mt={50} px={20}>
        <Button
          component={Link}
          href={'/Exam.xlsx'}
          download={true}
          maw={400}
          className="!bg-purple-900 p-2  !rounded-md uppercase text-yellow-400 font-semibold"
          leftSection={<IconDownload />}
        >
          DOWNLOAD MEMBERSHIP FORM
        </Button>
        <Title className="!text-sm md:!text-3xl " mt={20} ta={'center'}>
          Read carefully and fill the membership form in capital letters. Print
          the filled Form, scan and send via our email address:
          info@behindmarygiftwallsfoundation.org
        </Title>
      </Group>
    </Box>
  );
}
