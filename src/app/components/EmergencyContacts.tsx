import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Plus, Phone, Trash2, Shield, UserPlus, Cloud, CloudOff } from 'lucide-react';
import PINProtection from './PINProtection';
import { syncEmergencyContacts } from '../services/sync';
import { isUserLoggedIn } from '../services/auth';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function EmergencyContacts() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'synced' | 'syncing' | 'offline'>('offline');

  useEffect(() => {
    if (isUnlocked) {
      loadContacts();
    }
  }, [isUnlocked]);

  const loadContacts = () => {
    const saved = localStorage.getItem('emergency-contacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  };

  const saveContacts = async (newContacts: Contact[]) => {
    // Salva localmente
    localStorage.setItem('emergency-contacts', JSON.stringify(newContacts));
    setContacts(newContacts);

    // Sincroniza com Firebase se o usuário estiver logado
    if (isUserLoggedIn()) {
      setCloudStatus('syncing');
      const synced = await syncEmergencyContacts(newContacts);
      setCloudStatus(synced ? 'synced' : 'offline');

      // Volta para offline após 2 segundos
      if (synced) {
        setTimeout(() => setCloudStatus('offline'), 2000);
      }
    }
  };

  const handleAddContact = () => {
    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha nome e telefone');
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      relationship: formData.relationship
    };

    saveContacts([...contacts, newContact]);
    setFormData({ name: '', phone: '', relationship: '' });
    setShowAddForm(false);
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Tem certeza que deseja remover este contato?')) {
      saveContacts(contacts.filter(c => c.id !== id));
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  if (!isUnlocked) {
    return (
      <PINProtection
        onUnlock={() => setIsUnlocked(true)}
        onCancel={() => window.history.back()}
        title="Contatos de Emergência"
        description="Digite seu PIN para acessar"
      >
        <div />
      </PINProtection>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-lg mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">Contatos de Emergência</h1>
              <p className="text-xs text-gray-500">Pessoas de confiança</p>
            </div>
            {cloudStatus !== 'offline' && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                cloudStatus === 'synced'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-700'
              }`}>
                {cloudStatus === 'syncing' ? (
                  <>
                    <div className="w-3 h-3 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                    Salvando
                  </>
                ) : (
                  <>
                    <Cloud className="w-3 h-3" />
                    Salvo
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 rounded-[28px] shadow-[0_15px_50px_rgba(244,114,182,0.35)] p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Rede de Proteção
              </h2>
              <p className="text-sm text-pink-50/90 leading-relaxed">
                Estes contatos serão alertados automaticamente quando você ativar a Frase de Pânico
              </p>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 && !showAddForm && (
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Nenhum contato ainda</h3>
            <p className="text-sm text-gray-500 mb-6">
              Adicione pessoas de confiança que podem te ajudar em emergências
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-br from-pink-500 to-rose-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
            >
              Adicionar Primeiro Contato
            </button>
          </div>
        )}

        {contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {formatPhone(contact.phone)}
                      </p>
                      {contact.relationship && (
                        <p className="text-xs text-gray-500">
                          {contact.relationship}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="w-10 h-10 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Contact Form */}
        {showAddForm ? (
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Adicionar Contato</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Maria Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="(11) 98765-4321"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Relação (opcional)
              </label>
              <input
                type="text"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Mãe, Amiga, Irmã..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', phone: '', relationship: '' });
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 bg-gradient-to-br from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        ) : contacts.length > 0 && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white text-pink-600 border-2 border-pink-200 py-4 rounded-2xl font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Outro Contato
          </button>
        )}
      </main>
    </div>
  );
}
