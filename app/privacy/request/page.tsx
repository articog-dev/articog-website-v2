"use client";

import { Link } from "@/components/ui/Link";
import { Button, Container, Heading, Input, Textarea, Label, PageHero, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function PrivacyRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          requestType: data.get('type'),
          details: data.get('details'),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'We could not submit your request. Please try again later.');
      }

      toast.success(result.message || 'Your request was received for review.');
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'We could not submit your request. Please try again later.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <PageHero contentOnly className="flex-grow pb-20 px-4">
        <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">Data Rights Request</Heading>
            <p className="mt-[var(--gap-heading-to-text)] type-body-lg text-white/60">
              Submit a request to know, delete, or correct your personal information.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/60">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe" 
                required 
                className="rounded-lg bg-black px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email" 
                placeholder="john@example.com" 
                required 
                className="rounded-lg bg-black px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-white/60">Request Type</Label>
              <Select name="type" defaultValue="" required>
                <SelectTrigger id="type" className="rounded-lg bg-black px-4 py-3 text-white focus:border-white"><SelectValue placeholder="Select request type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="know">Right to Know</SelectItem>
                  <SelectItem value="delete">Right to Delete</SelectItem>
                  <SelectItem value="correct">Right to Correct</SelectItem>
                  <SelectItem value="opt-out">Opt-Out of Sale/Sharing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="text-white/60">Details / Message</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Please provide any additional context for your request..." 
                className="min-h-[120px] resize-none rounded-lg bg-black px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
              />
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm italic leading-relaxed text-white/40">
                Note: We may need to verify your identity before processing certain requests. We aim to respond within the timeframe required by applicable law.
              </p>
              <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-full bg-white text-lg font-semibold text-black transition-[background-color,transform] hover:bg-white/90">
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
              {errorMessage ? <p role="alert" className="text-sm text-red-300">{errorMessage}</p> : null}
            </div>
          </form>

          <div className="mt-12 space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <Heading as="h2" size="card" className="mb-2">Alternate Contact Method</Heading>
              <p className="text-white/60">
                You can also reach us at{' '}
                <a href="mailto:info@articog.com" className="text-white underline decoration-white/[0.08] underline-offset-4 hover:underline">
                  info@articog.com
                </a>.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy-choices" className="text-white/60 underline decoration-white/[0.08] underline-offset-4 transition-colors hover:text-white">
                ← Back to Privacy Choices
              </Link>
              <Link to="/privacy/california" className="text-white/60 underline decoration-white/[0.08] underline-offset-4 transition-colors hover:text-white">
                California Privacy Notice
              </Link>
            </div>
          </div>
        </div>
        </Container>
      </PageHero>

    </div>
  );
}
