import useSWR from 'swr';
import Navbar from './Navbar';
import Footer from './Footer';
import eZinApi from '../../pages/api/axios';



const fetcher = async () => {
  const response = await eZinApi.get(`/menu/main`);
  return response;
}

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/menu/main', fetcher);

  if (error) return <div> Failed to load </div>
  if (!data) return <div> Loading...</div>

  return (
    <>
      <Navbar headers={data?.data.data} />
      <main>{children}</main>
      <Footer />
    <>
        )
}
