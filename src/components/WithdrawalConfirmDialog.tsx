import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WithdrawalConfirmDialogProps {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (value: boolean) => void;
  withdrawAmount: string;
  withdrawMethod: string;
  cardNumber: string;
  isProcessing: boolean;
  handleConfirmWithdraw: () => void;
}

export default function WithdrawalConfirmDialog({
  showConfirmDialog,
  setShowConfirmDialog,
  withdrawAmount,
  withdrawMethod,
  cardNumber,
  isProcessing,
  handleConfirmWithdraw,
}: WithdrawalConfirmDialogProps) {
  return (
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
  );
}
