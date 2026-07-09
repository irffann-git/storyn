function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE4CB]">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner with gradient border */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: '#37400B',
              borderTopColor: 'transparent',
            }}
          />
          <div
            className="absolute inset-1 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: '#BDB47B',
              borderTopColor: 'transparent',
              animationDuration: '1.2s',
              animationDirection: 'reverse',
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: '#EDE4CB',
              borderTopColor: 'transparent',
              animationDuration: '0.8s',
            }}
          />
          {/* Book icon in the centre */}
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            📖
          </span>
        </div>
        <p className="text-xs font-semibold text-[#37400B] tracking-[0.2em] uppercase">
          Loading…
        </p>
      </div>
    </div>
  );
}

export default Loader;