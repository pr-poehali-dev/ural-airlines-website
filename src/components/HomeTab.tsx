import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

interface HomeTabProps {
  balance: number;
  transactions: Transaction[];
}

export default function HomeTab({ balance, transactions }: HomeTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
