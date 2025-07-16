"use client";
import { Separator } from '@/components/ui/separator'
import ProfileForm from './profile-form'
import { useAdmin } from '@/context/AdminContext';

export default function SettingsProfile() {
  const {user, loading} = useAdmin();
  // console.log(user, "user", loading, "loading")
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className='my-4' />
      <ProfileForm user={user}/>
    </div>
  )
}
