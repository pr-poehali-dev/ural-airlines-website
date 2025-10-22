import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import HomeTab from '@/components/HomeTab';
import ProfileTab from '@/components/ProfileTab';
import WithdrawalTab from '@/components/WithdrawalTab';
import HistoryTab from '@/components/HistoryTab';
import WithdrawalConfirmDialog from '@/components/WithdrawalConfirmDialog';

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
      <Header />

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

          <TabsContent value="home">
            <HomeTab balance={balance} transactions={transactions} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="withdrawal">
            <WithdrawalTab
              balance={balance}
              withdrawAmount={withdrawAmount}
              setWithdrawAmount={setWithdrawAmount}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              withdrawMethod={withdrawMethod}
              setWithdrawMethod={setWithdrawMethod}
              validateCardNumber={validateCardNumber}
              handleWithdrawClick={handleWithdrawClick}
            />
          </TabsContent>

          <TabsContent value="history">
            <HistoryTab transactions={transactions} />
          </TabsContent>
        </Tabs>
      </main>

      <WithdrawalConfirmDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        withdrawAmount={withdrawAmount}
        withdrawMethod={withdrawMethod}
        cardNumber={cardNumber}
        isProcessing={isProcessing}
        handleConfirmWithdraw={handleConfirmWithdraw}
      />
    </div>
  );
};

export default Index;
