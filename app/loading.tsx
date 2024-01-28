import Image from 'next/image';

export default function RootLoading() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div className="columns">
        <div className="column">
          <Image
            src="/spinner.svg"
            width={200}
            height={200}
            alt="Loading spinner"
            style={{ margin: '0 auto' }}
          />
        </div>
      </div>  
    </div>
  );
}
