export default function Fog() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-40"
      >
        <source src="/fog.mp4" type="video/mp4"/>


      </video>
    </div>
  );
}
