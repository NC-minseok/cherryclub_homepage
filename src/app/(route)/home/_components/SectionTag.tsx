export default function SectionTag({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block mb-6 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600/10 rounded-full ${className}`}
    >
      <span className="text-blue-700 font-semibold text-sm sm:text-base">
        {text}
      </span>
    </div>
  );
}
