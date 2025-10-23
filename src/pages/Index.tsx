import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface UserData {
  balance: number;
  donateBalance: number;
  privilege: string;
  clickMin: number;
  clickMax: number;
  businesses: number[];
  lastClickTime: number;
}

interface Business {
  id: number;
  name: string;
  price: number;
  profit: number;
  emoji: string;
}

const PRIVILEGES = [
  { name: '🎖️ Бомж', min: 500, max: 2500, required: 100000 },
  { name: '💰 Богач', min: 3000, max: 5000, required: 1000000 },
  { name: '🏦 Миллионер', min: 5000, max: 10000, required: 2000000 },
  { name: '🚀 Миллиардер', min: 10000, max: 25000, required: 10000000 },
  { name: '⚡ Читер', min: 25000, max: 50000, required: 25000000 },
  { name: '👑 VIP', min: 50000, max: 100000, required: 50000000 },
  { name: '🎯 Хакер', min: 100000, max: 250000, required: 100000000 },
  { name: '🌟 Бог', min: 250000, max: 500000, required: 100000000 },
];

const BUSINESSES: Business[] = [
  { id: 1, name: '24/7 бизнес', price: 500000, profit: 50000, emoji: '🏪' },
  { id: 2, name: 'Офис', price: 999999, profit: 75000, emoji: '🏢' },
  { id: 3, name: 'Компания ООО "Миллиардеры"', price: 1500000, profit: 125000, emoji: '🏛️' },
  { id: 4, name: 'Арбитраж команда', price: 200000, profit: 25000, emoji: '📊' },
  { id: 5, name: 'Лучшая работа', price: 500000, profit: 100000, emoji: '💼' },
];

const DONATE_SHOP = [
  { amount: 500, price: 100, emoji: '💎' },
  { amount: 1000, price: 200, emoji: '💠' },
  { amount: 5000, price: 500, emoji: '💫' },
];

const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

const Index = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserData>({
    balance: 10000,
    donateBalance: 0,
    privilege: '🎖️ Бомж',
    clickMin: 500,
    clickMax: 2500,
    businesses: [],
    lastClickTime: 0,
  });

  const [online] = useState(Math.floor(Math.random() * 50000));
  const [businessProfit, setBusinessProfit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalProfit = user.businesses.reduce((sum, bizId) => {
        const biz = BUSINESSES.find(b => b.id === bizId);
        return sum + (biz?.profit || 0);
      }, 0);
      setBusinessProfit(prev => prev + totalProfit);
    }, 1000);

    return () => clearInterval(interval);
  }, [user.businesses]);

  useEffect(() => {
    const nextPrivilege = PRIVILEGES.find(p => user.balance >= p.required);
    if (nextPrivilege && nextPrivilege.name !== user.privilege) {
      setUser(prev => ({
        ...prev,
        privilege: nextPrivilege.name,
        clickMin: nextPrivilege.min,
        clickMax: nextPrivilege.max,
      }));
      toast({
        title: '🎉 Новая привилегия!',
        description: `Вы получили статус ${nextPrivilege.name}`,
      });
    }
  }, [user.balance, user.privilege, toast]);

  const handleClick = () => {
    const now = Date.now();
    if (now - user.lastClickTime < 1000) {
      toast({
        title: '⏳ Подождите',
        description: 'Слишком быстро! Подождите секунду',
        variant: 'destructive',
      });
      return;
    }

    const earned = Math.floor(Math.random() * (user.clickMax - user.clickMin + 1)) + user.clickMin;
    setUser(prev => ({
      ...prev,
      balance: prev.balance + earned,
      lastClickTime: now,
    }));

    toast({
      title: '💸 Клик!',
      description: `+${formatNumber(earned)} монет`,
    });
  };

  const buyBusiness = (bizId: number) => {
    const biz = BUSINESSES.find(b => b.id === bizId);
    if (!biz) return;

    if (user.businesses.includes(bizId)) {
      toast({
        title: '⚠️ Ошибка',
        description: 'У вас уже есть этот бизнес',
        variant: 'destructive',
      });
      return;
    }

    if (user.balance < biz.price) {
      toast({
        title: '💰 Недостаточно средств',
        description: `Нужно ${formatNumber(biz.price)} монет`,
        variant: 'destructive',
      });
      return;
    }

    setUser(prev => ({
      ...prev,
      balance: prev.balance - biz.price,
      businesses: [...prev.businesses, bizId],
    }));

    toast({
      title: '🎉 Покупка успешна!',
      description: `${biz.emoji} ${biz.name}`,
    });
  };

  const collectProfit = () => {
    if (businessProfit === 0) {
      toast({
        title: '⚠️ Нет прибыли',
        description: 'Прибыль пока не накопилась',
        variant: 'destructive',
      });
      return;
    }

    setUser(prev => ({
      ...prev,
      balance: prev.balance + businessProfit,
    }));

    toast({
      title: '💰 Прибыль собрана!',
      description: `+${formatNumber(businessProfit)} монет`,
    });

    setBusinessProfit(0);
  };

  const playCasino = (bet: number) => {
    if (user.balance < bet) {
      toast({
        title: '💰 Недостаточно средств',
        description: `Нужно ${formatNumber(bet)} монет`,
        variant: 'destructive',
      });
      return;
    }

    const win = Math.random() < 0.4;
    const result = win ? Math.floor(bet * 1.5) : -bet;

    setUser(prev => ({
      ...prev,
      balance: prev.balance + result,
    }));

    toast({
      title: win ? '🎰 Выигрыш!' : '😢 Проигрыш',
      description: win ? `+${formatNumber(result)} монет` : `${formatNumber(bet)} монет`,
      variant: win ? 'default' : 'destructive',
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold rgb-gradient">
            МЕГА САЙТ
          </h1>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Icon name="Users" className="mr-2" size={20} />
              Онлайн: {formatNumber(online)}
            </Badge>
          </div>
        </div>

        <Card className="p-6 border-2 border-primary/20 pulse-glow">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-muted-foreground">Баланс</p>
              <p className="text-3xl font-bold text-primary">{formatNumber(user.balance)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Донат</p>
              <p className="text-3xl font-bold" style={{ color: 'hsl(var(--game-gold))' }}>
                {formatNumber(user.donateBalance)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Статус</p>
              <p className="text-2xl font-bold">{user.privilege}</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button 
            onClick={handleClick} 
            size="lg" 
            className="text-4xl px-12 py-8 h-auto click-animation pulse-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            💸 КЛИК
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            {formatNumber(user.clickMin)} - {formatNumber(user.clickMax)} за клик
          </p>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business">🏢 Бизнес</TabsTrigger>
            <TabsTrigger value="casino">🎰 Казино</TabsTrigger>
            <TabsTrigger value="donate">💎 Донат</TabsTrigger>
            <TabsTrigger value="profile">👤 Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-4">
            {user.businesses.length > 0 && (
              <Card className="p-4 bg-gradient-to-r from-green-900/20 to-green-800/20 border-green-600/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Накопленная прибыль</p>
                    <p className="text-2xl font-bold" style={{ color: 'hsl(var(--game-green))' }}>
                      {formatNumber(businessProfit)}
                    </p>
                  </div>
                  <Button onClick={collectProfit} className="bg-green-600 hover:bg-green-700">
                    Забрать прибыль
                  </Button>
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {BUSINESSES.map((biz) => {
                const owned = user.businesses.includes(biz.id);
                return (
                  <Card key={biz.id} className={`p-4 ${owned ? 'border-green-600/50 bg-green-900/10' : ''}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-2xl mb-1">{biz.emoji}</p>
                          <p className="font-bold">{biz.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(biz.profit)} монет/сек
                          </p>
                        </div>
                        {owned && <Badge className="bg-green-600">Куплено</Badge>}
                      </div>
                      <Button 
                        onClick={() => buyBusiness(biz.id)} 
                        disabled={owned}
                        className="w-full"
                        variant={owned ? 'secondary' : 'default'}
                      >
                        {owned ? 'В собственности' : `Купить за ${formatNumber(biz.price)}`}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="casino" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/50">
              <h3 className="text-2xl font-bold mb-4 text-center">🎰 Казино</h3>
              <p className="text-center text-muted-foreground mb-6">
                Шанс выигрыша: 40% | Выплата: ×1.5
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[10000, 50000, 100000].map((bet) => (
                  <Button 
                    key={bet}
                    onClick={() => playCasino(bet)}
                    className="h-20 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Ставка<br/>{formatNumber(bet)}
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="donate" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {DONATE_SHOP.map((item) => (
                <Card key={item.amount} className="p-6 text-center bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/50">
                  <p className="text-4xl mb-3">{item.emoji}</p>
                  <p className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--game-gold))' }}>
                    {formatNumber(item.amount)} доната
                  </p>
                  <p className="text-muted-foreground mb-4">{item.price} руб</p>
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    Купить
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-600/50">
              <h3 className="text-2xl font-bold mb-3 text-center">🎁 Кейс</h3>
              <p className="text-center text-muted-foreground mb-4">
                Машины, привилегии, деньги, донат
              </p>
              <Button className="w-full h-16 text-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                Открыть за 700 руб
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">👤 Профиль</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">Текущий статус</p>
                  <p className="text-2xl font-bold">{user.privilege}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Доход за клик</p>
                  <p className="text-xl">{formatNumber(user.clickMin)} - {formatNumber(user.clickMax)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Бизнесов в собственности</p>
                  <p className="text-xl">{user.businesses.length} / {BUSINESSES.length}</p>
                </div>
                
                <div className="space-y-2 mt-6">
                  <p className="font-bold">Система привилегий:</p>
                  {PRIVILEGES.map((priv) => {
                    const progress = Math.min((user.balance / priv.required) * 100, 100);
                    const isActive = user.privilege === priv.name;
                    return (
                      <div key={priv.name} className={`p-3 rounded-lg border ${isActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
                        <div className="flex justify-between mb-1">
                          <span className={isActive ? 'font-bold' : ''}>{priv.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatNumber(priv.required)}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
