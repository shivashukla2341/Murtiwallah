export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-11 sm:px-8">
      <h1 className="mb-1.5 text-[30px]">{title}</h1>
      <p className="mb-9 text-[13px] text-foreground/55">Last updated {lastUpdated}</p>
      <div className="flex flex-col gap-8 text-[14.5px] leading-relaxed text-foreground/78">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2.5 text-[19px] text-foreground">{heading}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
