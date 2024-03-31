import BasicTable from '@/components/Table/BasicTable';

export default function Main() {
  return (
    <div className="mx-auto my-32 max-w-[1200px]">
      <section className="flex flex-col gap-16">
        <h1 className="text-32 font-bold">Basic Table</h1>
        <BasicTable />
      </section>
    </div>
  );
}
