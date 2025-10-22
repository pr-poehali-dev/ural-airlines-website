import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfileTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>Управление личными данными</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">UA</AvatarFallback>
            </Avatar>
            <Button variant="outline">Изменить фото</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input defaultValue="Иван" />
            </div>
            <div className="space-y-2">
              <Label>Фамилия</Label>
              <Input defaultValue="Петров" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="ivan@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Телефон</Label>
              <Input defaultValue="+7 (999) 123-45-67" />
            </div>
          </div>
          <Button className="w-full">Сохранить изменения</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Настройки безопасности</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Текущий пароль</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Новый пароль</Label>
            <Input type="password" />
          </div>
          <Button variant="secondary" className="w-full">Изменить пароль</Button>
        </CardContent>
      </Card>
    </div>
  );
}
