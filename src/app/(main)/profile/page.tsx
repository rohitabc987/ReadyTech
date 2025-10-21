
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentUser } from '@/lib/firebase/users';
import { Switch } from '@/components/ui/switch';

export default async function ProfilePage() {
    const user = await getCurrentUser();
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

  return (
    <main className="flex-1 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Update your personal information and mentorship status.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                    <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">Change Photo</Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.personal.name} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={user.personal.email} disabled />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" defaultValue={user.academics.institution} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input id="graduationYear" type="number" defaultValue={user.academics.graduationYear} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." defaultValue={user.personal.bio} className="min-h-[100px]" />
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="is-mentor" defaultChecked={user.academics.role === 'mentor'} />
                <Label htmlFor="is-mentor">Available for Mentorship</Label>
            </div>

            <div className="flex justify-start">
                <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
