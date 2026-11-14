export default async function JobDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
const { id } = await params
console.log(id);
return(
  <p>Job details of id: {id}</p>
)
}