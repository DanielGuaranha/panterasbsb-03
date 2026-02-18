import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCompanionBySlug, updateCompanion } from '../services/supabaseClient'; // Usando slug como ID para o mock
import { CompanionWithGallery } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileCard from '../components/ProfileCard';

const EditCompanion: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Na rota real seria ID, aqui usaremos o slug mockado
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'gallery' | 'services' | 'settings'>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CompanionWithGallery>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Estado local para preview da imagem quando o usuário fizer "upload"
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  // Simula carregamento dos dados
  useEffect(() => {
    // Em um cenário real, buscaríamos pelo ID. 
    // Como o mock usa slugs, vamos simular que o ID passado é um slug ou buscar um default.
    const fetchMock = async () => {
        // Fallback para alice se o ID for numérico ou carregar direto (Hard Delete de Isabella aplicado)
        const slugToFetch = id === '1' ? 'alice' : id || 'alice';
        const data = await getCompanionBySlug(slugToFetch);
        if (data) {
            setFormData(data);
            // Configura o preview inicial com a imagem existente
            setPreviewImage(data.image_url || data.gallery_items?.[0]?.url);
        }
        setIsLoading(false);
    };
    fetchMock();
  }, [id]);

  const handleSave = async () => {
    if (!formData.id) return;

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Separa gallery_items e categories se necessário, pois o updateCompanion espera Partial<Companion>
    // Na implementação real do serviço, isso deve ser tratado. Aqui passamos o objeto limpo.
    const { gallery_items, categories, ...updatePayload } = formData;

    const result = await updateCompanion(formData.id, updatePayload);

    if (result.success) {
      setSuccessMsg(t('edit.success'));
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(t('edit.error'));
    }
    
    setIsSaving(false);
  };

  const handleInputChange = (field: keyof CompanionWithGallery, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Simulação de upload de capa
  const handleCoverUpload = (file: File) => {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      // Aqui entraria a lógica de upload real para o Supabase Storage
      alert(`Simulação: Arquivo "${file.name}" selecionado para capa. Salve para confirmar.`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-t-2 border-gold-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-20">
      <SEO title={`${t('edit.title')}: ${formData.display_name} | Admin`} noIndex={true} />

      {/* Header Fixo (Action Bar) */}
      <header className="sticky top-14 md:top-16 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <div>
                <h1 className="text-lg font-bold text-white leading-none">{formData.display_name}</h1>
                <p className="text-[0.65rem] text-slate-500 uppercase tracking-widest mt-1">
                   ID: <span className="font-mono text-gold-500">{formData.id?.substring(0, 8)}...</span>
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gold-600 hover:bg-gold-500 text-black font-bold text-xs px-6 py-2.5 rounded-lg shadow-lg shadow-gold-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
                {isSaving ? (
                    <>
                        <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        {t('edit.saving')}
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {t('edit.save')}
                    </>
                )}
            </button>
        </div>
      </header>

      {/* Feedback Messages */}
      {(successMsg || errorMsg) && (
        <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-xl font-bold text-sm flex items-center gap-2 animate-fade-in-up ${successMsg ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
           {successMsg && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
           {errorMsg && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
           {successMsg || errorMsg}
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
            <TabButton label={t('edit.tabs.profile')} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon="👤" />
            <TabButton label={t('edit.tabs.gallery')} active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon="📸" />
            <TabButton label={t('edit.tabs.details')} active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon="✨" />
            <TabButton label={t('edit.tabs.settings')} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
            
            {/* Left Column (Forms) */}
            <div className="lg:col-span-2 space-y-6">
                
                {activeTab === 'profile' && (
                    <>
                        <SectionCard title={t('edit.sections.identity')}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label={t('edit.labels.stage_name')} value={formData.display_name} onChange={(v) => handleInputChange('display_name', v)} />
                                <Input label={t('edit.labels.slug')} value={formData.slug} onChange={(v) => handleInputChange('slug', v)} prefix="panterasbsb.com/perfil/" />
                                <Input label={t('edit.labels.city')} value={formData.city} onChange={(v) => handleInputChange('city', v)} />
                                <Input label={t('edit.labels.neighborhood')} value={formData.neighborhood} onChange={(v) => handleInputChange('neighborhood', v)} />
                            </div>
                        </SectionCard>

                        <SectionCard title={t('edit.sections.contact_price')}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label={t('edit.labels.whatsapp')} value={formData.whatsapp_number} onChange={(v) => handleInputChange('whatsapp_number', v)} />
                                <div className="flex gap-2">
                                     <div className="flex-1">
                                        <Input label={t('edit.labels.price')} type="number" value={formData.base_price?.toString()} onChange={(v) => handleInputChange('base_price', parseFloat(v))} />
                                     </div>
                                     <div className="w-1/3">
                                        <Label>{t('edit.labels.mode')}</Label>
                                        <select 
                                            value={formData.pricing_mode}
                                            onChange={(e) => handleInputChange('pricing_mode', e.target.value)}
                                            className="w-full bg-[#111] border border-slate-800 text-white px-3 py-3 rounded-lg focus:border-gold-500 outline-none text-sm appearance-none"
                                        >
                                            <option value="fixed">Fixed</option>
                                            <option value="negotiable">Negotiable</option>
                                            <option value="contact">Contact</option>
                                        </select>
                                     </div>
                                </div>
                            </div>
                        </SectionCard>
                    </>
                )}

                {activeTab === 'gallery' && (
                    <SectionCard title={t('edit.sections.media')}>
                         <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center hover:border-gold-500/50 transition-colors cursor-pointer bg-[#0a0a0a]">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-gold-500">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </div>
                            <p className="text-sm text-slate-300 font-bold">{t('edit.upload_hint')}</p>
                            <p className="text-xs text-slate-500 mt-1">JPG, PNG, MP4</p>
                         </div>

                         <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                            {formData.gallery_items?.map((item: any, idx: number) => (
                                <div key={item.id || idx} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                                    <img src={item.url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="bg-black/70 p-1.5 rounded text-red-400 hover:text-white" title="Excluir">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <button className={`bg-black/70 p-1.5 rounded ${item.is_premium ? 'text-gold-500' : 'text-slate-400'} hover:text-white`} title="Premium/Público">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                    {item.is_premium && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gold-900/80 text-gold-200 text-[0.55rem] font-bold text-center py-1 uppercase">
                                            Premium
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                    </SectionCard>
                )}

                {activeTab === 'services' && (
                    <>
                        <SectionCard title={t('edit.sections.bio')}>
                            <div className="space-y-4">
                                <div>
                                    <Label>{t('edit.labels.short_bio')}</Label>
                                    <textarea 
                                        rows={2} 
                                        value={formData.short_bio} 
                                        onChange={(e) => handleInputChange('short_bio', e.target.value)}
                                        className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:border-gold-500 outline-none text-sm leading-relaxed"
                                    />
                                    <p className="text-[0.6rem] text-slate-600 text-right mt-1">{formData.short_bio?.length || 0}/120 chars</p>
                                </div>
                                <div>
                                    <Label>{t('edit.labels.full_bio')}</Label>
                                    <textarea 
                                        rows={6} 
                                        value={formData.full_bio} 
                                        onChange={(e) => handleInputChange('full_bio', e.target.value)}
                                        className="w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:border-gold-500 outline-none text-sm leading-relaxed"
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard title={t('edit.sections.physical')}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Input label={t('edit.labels.age')} type="number" value={formData.age?.toString()} onChange={(v) => handleInputChange('age', parseInt(v))} />
                                <Input label={t('edit.labels.height')} type="number" value={formData.height_cm?.toString()} onChange={(v) => handleInputChange('height_cm', parseInt(v))} />
                                <Input label={t('edit.labels.weight')} type="number" value={formData.weight_kg?.toString()} onChange={(v) => handleInputChange('weight_kg', parseInt(v))} />
                                <Input label={t('edit.labels.measures')} value={formData.measurements} onChange={(v) => handleInputChange('measurements', v)} />
                            </div>
                        </SectionCard>
                    </>
                )}

                {activeTab === 'settings' && (
                    <SectionCard title={t('edit.sections.account')}>
                        <div className="space-y-4">
                            <Toggle label={t('edit.labels.active')} checked={formData.whatsapp_status === 'active'} onChange={(c) => handleInputChange('whatsapp_status', c ? 'active' : 'banned')} />
                            <Toggle label={t('edit.labels.vip')} checked={formData.is_vip || false} onChange={(c) => handleInputChange('is_vip', c)} />
                            <Toggle label={t('edit.labels.couples')} checked={formData.serves_couples || false} onChange={(c) => handleInputChange('serves_couples', c)} />
                            
                            <div className="pt-6 border-t border-slate-800 mt-6">
                                <p className="text-xs text-red-400 font-bold uppercase mb-2">{t('edit.danger_zone')}</p>
                                <button className="text-xs text-red-500 border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/20 transition-colors">
                                    {t('edit.delete_profile')}
                                </button>
                            </div>
                        </div>
                    </SectionCard>
                )}

            </div>

            {/* Right Column (Live Preview / Context) */}
            <div className="hidden lg:block">
                <div className="sticky top-32">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('edit.preview_title')}</h3>
                    
                    {/* Real Profile Card Component used for accurate preview */}
                    <div className="pointer-events-none"> {/* Disable clicking links in preview */}
                        {formData && formData.slug && (
                            // @ts-ignore - casting partial data to match types
                            /* Fixed: Removed unsupported props 'isEditable' and 'onImageUpload' to fix type error. */
                            <ProfileCard 
                                data={formData as any} 
                                image={previewImage}
                            />
                        )}
                    </div>

                    <div className="mt-6 bg-[#111] p-4 rounded-lg border border-slate-800">
                        <h4 className="text-gold-500 text-xs font-bold uppercase mb-2">{t('edit.ux_tip.title')}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            {t('edit.ux_tip.text')}
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

/* --- UI Components --- */

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 shadow-lg">
        <h2 className="text-gold-400 font-serif text-lg mb-6 pb-2 border-b border-white/5">{title}</h2>
        {children}
    </div>
);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void; icon: string }> = ({ label, active, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            active 
            ? 'bg-slate-800 text-gold-400 border border-gold-500/30' 
            : 'text-slate-500 hover:text-white hover:bg-white/5'
        }`}
    >
        <span className="text-base">{icon}</span>
        {label}
    </button>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="block text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold mb-2 ml-1">
        {children}
    </label>
);

const Input: React.FC<{ label: string; value?: string; onChange: (val: string) => void; type?: string; prefix?: string }> = ({ label, value, onChange, type = "text", prefix }) => (
    <div>
        <Label>{label}</Label>
        <div className="relative flex items-center">
            {prefix && (
                <span className="absolute left-3 text-slate-600 text-sm select-none">{prefix}</span>
            )}
            <input 
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-[#111] border border-slate-800 text-white px-4 py-3 rounded-lg focus:border-gold-500 outline-none text-sm transition-colors placeholder-slate-700 ${prefix ? 'pl-[140px]' : ''}`}
                placeholder="..."
            />
        </div>
    </div>
);

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-slate-800">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        <button 
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-gold-500' : 'bg-slate-700'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

export default EditCompanion;