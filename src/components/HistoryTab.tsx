import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

interface HistoryTabProps {
  transactions: Transaction[];
}

export default function HistoryTab({ transactions }: HistoryTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
