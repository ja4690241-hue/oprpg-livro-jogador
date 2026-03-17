import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Scroll, 
  MapPin, 
  Star, 
  Coins, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

export default function Campaign() {
  const [activeTab, setActiveTab] = useState('quests');
  const [showNewQuest, setShowNewQuest] = useState(false);
  const [showNewLog, setShowNewLog] = useState(false);

  // Queries
  const { data: quests, refetch: refetchQuests } = trpc.campaign.getQuests.useQuery();
  const { data: logs, refetch: refetchLogs } = trpc.campaign.getLogs.useQuery();

  // Mutations
  const createQuest = trpc.campaign.createQuest.useMutation({
    onSuccess: () => { toast.success('Missão criada!'); setShowNewQuest(false); refetchQuests(); }
  });
  const updateQuest = trpc.campaign.updateQuestStatus.useMutation({
    onSuccess: () => { toast.success('Status atualizado!'); refetchQuests(); }
  });
  const createLog = trpc.campaign.createLog.useMutation({
    onSuccess: () => { toast.success('Diário atualizado!'); setShowNewLog(false); refetchLogs(); }
  });

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.02_240)] text-[oklch(0.92_0.01_240)] pb-12">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="font-['Cinzel_Decorative'] text-4xl font-bold mb-2">Diário de Bordo</h1>
            <p className="text-[oklch(0.50_0.02_240)] uppercase tracking-widest text-sm font-bold">Crônicas da Grand Line</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowNewLog(true)} className="bg-[oklch(0.15_0.05_240)] border border-white/10 hover:bg-white/5">
              <BookOpen className="w-4 h-4 mr-2" /> Novo Relato
            </Button>
            <Button onClick={() => setShowNewQuest(true)} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" /> Nova Missão
            </Button>
          </div>
        </header>

        <Tabs defaultValue="quests" className="w-full">
          <TabsList className="w-full bg-[oklch(0.12_0.04_240)] border border-white/5 h-12 mb-8">
            <TabsTrigger value="quests" className="flex-1 gap-2"><Star className="w-4 h-4" /> Missões Ativas</TabsTrigger>
            <TabsTrigger value="journal" className="flex-1 gap-2"><Scroll className="w-4 h-4" /> Relatos de Sessão</TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4">
            {showNewQuest && (
              <Card className="bg-[oklch(0.15_0.05_240)] border-orange-500/30 p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                <h3 className="font-['Cinzel'] font-bold mb-4">Nova Missão</h3>
                <div className="space-y-4">
                  <Input placeholder="Título da Missão" className="bg-black/20" id="q-title" />
                  <Textarea placeholder="Descrição..." className="bg-black/20" id="q-desc" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="XP Recompensa" className="bg-black/20" id="q-xp" />
                    <Input type="number" placeholder="Bellys Recompensa" className="bg-black/20" id="q-belly" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowNewQuest(false)}>Cancelar</Button>
                    <Button onClick={() => {
                      const title = (document.getElementById('q-title') as HTMLInputElement).value;
                      const description = (document.getElementById('q-desc') as HTMLTextAreaElement).value;
                      const rewardXp = parseInt((document.getElementById('q-xp') as HTMLInputElement).value) || 0;
                      const rewardBellys = parseInt((document.getElementById('q-belly') as HTMLInputElement).value) || 0;
                      createQuest.mutate({ title, description, rewardXp, rewardBellys });
                    }} className="bg-orange-600">Zarpar Missão</Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quests?.map(q => (
                <Card key={q.id} className={`p-6 border-white/5 ${q.status === 'concluida' ? 'bg-green-900/10 border-green-500/20' : q.status === 'fracassada' ? 'bg-red-900/10 border-red-500/20' : 'bg-[oklch(0.12_0.04_240)]'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{q.title}</h4>
                      <div className="flex gap-3 mt-1">
                        <span className="flex items-center text-[10px] font-bold text-orange-400 uppercase"><Star className="w-3 h-3 mr-1" /> {q.rewardXp} XP</span>
                        <span className="flex items-center text-[10px] font-bold text-yellow-500 uppercase"><Coins className="w-3 h-3 mr-1" /> ฿{q.rewardBellys?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {q.status === 'ativa' && (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => updateQuest.mutate({ id: q.id, status: 'concluida' })} className="h-8 w-8 text-green-500 hover:bg-green-500/10"><CheckCircle2 className="w-5 h-5" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => updateQuest.mutate({ id: q.id, status: 'fracassada' })} className="h-8 w-8 text-red-500 hover:bg-red-500/10"><XCircle className="w-5 h-5" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{q.description}</p>
                </Card>
              ))}
              {quests?.length === 0 && <p className="text-center py-12 text-white/20 italic col-span-2">Nenhuma missão no horizonte...</p>}
            </div>
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
             {showNewLog && (
              <Card className="bg-[oklch(0.15_0.05_240)] border-white/10 p-6 mb-8">
                <h3 className="font-['Cinzel'] font-bold mb-4">Relato de Sessão</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Input type="number" placeholder="Sessão #" className="bg-black/20" id="l-num" />
                    <Input placeholder="Título (Opcional)" className="bg-black/20 col-span-2" id="l-title" />
                  </div>
                  <Input placeholder="Ilha Atual" className="bg-black/20" id="l-island" />
                  <Textarea placeholder="O que aconteceu nesta aventura?" className="bg-black/20 h-40" id="l-content" />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowNewLog(false)}>Descartar</Button>
                    <Button onClick={() => {
                      const sessionNumber = parseInt((document.getElementById('l-num') as HTMLInputElement).value) || 1;
                      const title = (document.getElementById('l-title') as HTMLInputElement).value;
                      const islandName = (document.getElementById('l-island') as HTMLInputElement).value;
                      const content = (document.getElementById('l-content') as HTMLTextAreaElement).value;
                      createLog.mutate({ sessionNumber, title, islandName, content });
                    }} className="bg-blue-600">Publicar no Diário</Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-6">
              {logs?.map(l => (
                <div key={l.id} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-bold text-xl flex items-center gap-3">
                      <span className="text-orange-500 font-mono text-sm">Sessão {l.sessionNumber}</span>
                      {l.title}
                    </h4>
                    <span className="text-xs text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(l.datePlayed!).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {l.islandName && (
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-blue-400 mb-4 tracking-tighter">
                      <MapPin className="w-3 h-3" /> {l.islandName}
                    </div>
                  )}
                  <div className="bg-[oklch(0.12_0.04_240)] p-6 rounded-xl border border-white/5 text-white/70 leading-relaxed whitespace-pre-wrap italic font-serif">
                    "{l.content}"
                  </div>
                </div>
              ))}
              {logs?.length === 0 && <p className="text-center py-12 text-white/20 italic">O diário está em branco...</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
