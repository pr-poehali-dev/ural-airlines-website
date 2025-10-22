import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface WithdrawalTabProps {
  balance: number;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  withdrawMethod: string;
  setWithdrawMethod: (value: string) => void;
  validateCardNumber: (card: string) => boolean;
  handleWithdrawClick: () => void;
}

export default function WithdrawalTab({
  balance,
  withdrawAmount,
  setWithdrawAmount,
  cardNumber,
  setCardNumber,
  withdrawMethod,
  setWithdrawMethod,
  validateCardNumber,
  handleWithdrawClick,
}: WithdrawalTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
