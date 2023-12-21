'use client';
import { Container, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useForm, ValidationError } from '@formspree/react';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Button } from '@/components/UI/button';

interface Props {}
const text = ['Contact us'];
const MotionTitle = motion(Title);
const Contact: NextPage<Props> = ({}): JSX.Element => {
  // const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!);
  // if (state.succeeded) {
  //   return <p>Thanks for your submission!</p>;
  // }
  return (
    <div className="min-h-screen py-[120px]">
      <Container my={'md'} className="!mb-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            order={1}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </Container>
      <Container>
        <form
          action={process.env.NEXT_PUBLIC_FORM}
          method="POST"
          className="space-y-6"
        >
          <div className="space-y-4">
            <label htmlFor="email">Full name</label>
            <Input
              required
              id="name"
              type="name"
              name="name"
              placeholder="Full name"
            />
      
          </div>
          <div className="space-y-4">
            <label htmlFor="email">Email Address</label>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
        
          </div>
          <div className="space-y-4">
            <label htmlFor="email">Subject</label>
            <Input
              required
              id="subject"
              type="subject"
              name="subject"
              placeholder="Subject"
            />
        
          </div>
          <div className="space-y-4">
            <label htmlFor="email">Message</label>

            <Textarea
              required
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              className="resize-none"
            />
         
          </div>

          <Button
            color={'purple'}
            variant={'link'}
            type="submit"
            // disabled={state.submitting}
            className="bg-purple-900 text-white"
          >
            Submit
          </Button>
         
        </form>
      </Container>
    </div>
  );
};

export default Contact;
