export default function TransitionOverlay({ active }) {
  return (
    <div
      className={`
        fixed inset-0 bg-black z-50 pointer-events-none
        transition-all duration-700 ease-in-out
        ${active ? "opacity-100" : "opacity-0"}
      `}
    />
  );
}
