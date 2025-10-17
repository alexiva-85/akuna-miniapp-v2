import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Russian dashboard by default
  redirect('/ru/app/dashboard');
}
