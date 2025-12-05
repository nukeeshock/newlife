
import { SiteFooter } from '@/components/layout/footer';
import { ChoiceCard } from '@/components/gateway/choice';

export default function GatewayPage() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      flexDirection: 'column',
      color: '#F3F3F3',
      fontFamily: 'serif', 
    }}>
      {/* Video Background Placeholder */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.5,
        zIndex: 1,
      }}></div>

      {/* Main Content */}
      <main style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, 
        textAlign: 'center' 
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'normal', letterSpacing: '0.1em', marginBottom: '4rem' }}>
          NEW LIFE VIETNAM
        </h1>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <ChoiceCard 
            href="/wohnen"
            title="Exklusives Langzeitwohnen"
            description="Ihr neuer Lebensabschnitt im Paradies."
          />
          <ChoiceCard 
            href="/immobilien"
            title="Luxus-Immobilien"
            description="Finden und investieren Sie in Vietnams Juwelen."
          />
        </div>
      </main>

      {/* Footer */}
      <div style={{zIndex: 2}}>
        <SiteFooter />
      </div>
    </div>
  );
}
