import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

const Index = () => {
  const { toast } = useToast();
  const [balance] = useState(754.00);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('card');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions] = useState<Transaction[]>([
    { id: '7160050', type: 'withdrawal', amount: 754.00, status: 'completed', date: '2024-10-20', method: 'Карта 2ATE / 2ATE' },
    { id: '7160049', type: 'deposit', amount: 1200.00, status: 'completed', date: '2024-10-19', method: 'Карта 1234' },
    { id: '7160048', type: 'withdrawal', amount: 500.00, status: 'pending', date: '2024-10-18', method: 'Карта 5678' },
    { id: '7160047', type: 'withdrawal', amount: 300.00, status: 'completed', date: '2024-10-17', method: 'Карта 9012' },
  ]);

  const validateCardNumber = (card: string) => {
    const cleaned = card.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const handleWithdrawClick = () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Укажите сумму для вывода',
        variant: 'destructive',
      });
      return;
    }

    if (Number(withdrawAmount) > balance) {
      toast({
        title: 'Недостаточно средств',
        description: 'На балансе недостаточно средств для вывода',
        variant: 'destructive',
      });
      return;
    }

    if (!cardNumber) {
      toast({
        title: 'Ошибка',
        description: 'Укажите номер карты',
        variant: 'destructive',
      });
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      toast({
        title: 'Неверный формат',
        description: 'Номер карты должен содержать 16 цифр',
        variant: 'destructive',
      });
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmWithdraw = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmDialog(false);
      
      toast({
        title: 'Заявка принята',
        description: `Вывод $${Number(withdrawAmount).toFixed(2)} успешно оформлен. Средства поступят в течение 1-3 рабочих дней.`,
      });
      
      setWithdrawAmount('');
      setCardNumber('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Plane" className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              UralAirlines
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar>
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-card">
            <TabsTrigger value="home">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="withdrawal">
              <Icon name="CreditCard" size={18} className="mr-2" />
              Вывод
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="Receipt" size={18} className="mr-2" />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="bg-gradient-to-br from-primary via-primary to-secondary text-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Баланс карты</CardTitle>
                <CardDescription className="text-white/80">Доступно для вывода</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-4">${balance.toFixed(2)}</div>
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-white text-primary hover:bg-white/90"
                    onClick={() => {
                      const tab = document.querySelector('[value="withdrawal"]') as HTMLElement;
                      tab?.click();
                    }}
                  >
                    <Icon name="ArrowUpRight" size={18} className="mr-2" />
                    Вывести средства
                  </Button>
                  <Button variant="outline" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Icon name="ArrowDownRight" size={18} className="mr-2" />
                    Пополнить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего выведено</CardTitle>
                  <Icon name="TrendingUp" className="text-accent" size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,554.00</div>
                  <p className="text-xs text-muted-foreground">За последний месяц</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Операций</CardTitle>
                  <Icon name="Activity" className="text-secondary" size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <p className="text-xs text-muted-foreground">Успешных транзакций</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Статус</CardTitle>
                  <Icon name="CheckCircle" className="text-accent" size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Активен</div>
                  <p className="text-xs text-muted-foreground">Профиль подтвержден</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние операции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'withdrawal' ? 'bg-primary/10' : 'bg-accent/10'
                        }`}>
                          <Icon name={tx.type === 'withdrawal' ? 'ArrowUpRight' : 'ArrowDownRight'} 
                            className={tx.type === 'withdrawal' ? 'text-primary' : 'text-accent'} 
                            size={18} 
                          />
                        </div>
                        <div>
                          <div className="font-medium">{tx.method}</div>
                          <div className="text-sm text-muted-foreground">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}</div>
                        <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>
                          {tx.status === 'completed' ? 'Завершено' : tx.status === 'pending' ? 'В обработке' : 'Ошибка'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="withdrawal" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Вывод средств</CardTitle>
                <CardDescription>Выберите способ и укажите сумму</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Доступный баланс</div>
                  <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
                </div>

                <div className="space-y-2">
                  <Label>Способ вывода</Label>
                  <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Банковская карта</SelectItem>
                      <SelectItem value="wallet">Электронный кошелек</SelectItem>
                      <SelectItem value="bank">Банковский перевод</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Номер карты</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                  {cardNumber && !validateCardNumber(cardNumber) && (
                    <p className="text-sm text-destructive">Введите корректный номер карты (16 цифр)</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Сумма вывода</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      className="pl-8" 
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[100, 250, 500, balance].map((amount) => (
                      <Button 
                        key={amount} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setWithdrawAmount(amount.toString())}
                      >
                        ${amount.toFixed(0)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма</span>
                    <span className="font-medium">${withdrawAmount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Комиссия (2%)</span>
                    <span className="font-medium">${(Number(withdrawAmount) * 0.02 || 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>К получению</span>
                    <span>${(Number(withdrawAmount) * 0.98 || 0).toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleWithdrawClick}>
                  <Icon name="Send" size={18} className="mr-2" />
                  Вывести средства
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Подтверждение вывода</DialogTitle>
                <DialogDescription>
                  Проверьте данные перед подтверждением операции
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div>
                    <p className="text-sm text-muted-foreground">Сумма вывода</p>
                    <p className="text-2xl font-bold">${Number(withdrawAmount).toFixed(2)}</p>
                  </div>
                  <Icon name="Banknote" size={32} className="text-primary" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Способ вывода</span>
                    <span className="font-medium">
                      {withdrawMethod === 'card' ? 'Банковская карта' : withdrawMethod === 'wallet' ? 'Электронный кошелек' : 'Банковский перевод'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Номер карты</span>
                    <span className="font-medium">**** **** **** {cardNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Комиссия (2%)</span>
                    <span className="font-medium">${(Number(withdrawAmount) * 0.02).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold">К получению</span>
                    <span className="font-bold text-primary">${(Number(withdrawAmount) * 0.98).toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Средства поступят на указанную карту в течение 1-3 рабочих дней
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isProcessing}>
                  Отмена
                </Button>
                <Button onClick={handleConfirmWithdraw} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      Подтвердить
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <TabsContent value="history" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>История операций</CardTitle>
                <CardDescription>Все транзакции за последний период</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <Card key={tx.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              tx.type === 'withdrawal' ? 'bg-primary/10' : 'bg-accent/10'
                            }`}>
                              <Icon 
                                name={tx.type === 'withdrawal' ? 'ArrowUpRight' : 'ArrowDownRight'} 
                                className={tx.type === 'withdrawal' ? 'text-primary' : 'text-accent'} 
                                size={20} 
                              />
                            </div>
                            <div>
                              <div className="font-semibold">{tx.method}</div>
                              <div className="text-sm text-muted-foreground">ID: {tx.id}</div>
                              <div className="text-sm text-muted-foreground">{tx.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </div>
                            <Badge 
                              variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}
                              className="mt-1"
                            >
                              {tx.status === 'completed' ? 'Завершено' : tx.status === 'pending' ? 'В обработке' : 'Ошибка'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>История операций</CardTitle>
                <CardDescription>Все транзакции за последний период</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <Card key={tx.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              tx.type === 'withdrawal' ? 'bg-primary/10' : 'bg-accent/10'
                            }`}>
                              <Icon 
                                name={tx.type === 'withdrawal' ? 'ArrowUpRight' : 'ArrowDownRight'} 
                                className={tx.type === 'withdrawal' ? 'text-primary' : 'text-accent'} 
                                size={20} 
                              />
                            </div>
                            <div>
                              <div className="font-semibold">{tx.method}</div>
                              <div className="text-sm text-muted-foreground">ID: {tx.id}</div>
                              <div className="text-sm text-muted-foreground">{tx.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </div>
                            <Badge 
                              variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}
                              className="mt-1"
                            >
                              {tx.status === 'completed' ? 'Завершено' : tx.status === 'pending' ? 'В обработке' : 'Ошибка'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;