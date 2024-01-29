import { getApiDocs } from "../../lib/swagger";
import { ReactSwagger } from "./react-swagger";
export default async function Home() {
  const spec = await getApiDocs();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ReactSwagger spec={spec} />
    </main>
  );
}
