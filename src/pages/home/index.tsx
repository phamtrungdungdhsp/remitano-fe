import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box } from './box';
import './style.css';

export const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 3,
    totalIems: 1,
    totalPages: 1,
  })
  useEffect(() => {
    setVideos([])
    getVideos(1)
  }, [])
  const getVideos = async (page: number) => {
    const { data } = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/videos?page=${page}&limit=3`,
    })
    const items = videos.concat(data.items);
    setVideos(items)
    setMeta(data.meta)
  }
  return (<>
    <div className="wrapper">
      {
        videos?.map((item: any) => (<Box title={item.title} sharedBy={item.userEmail} description={item.description} url={item.iframeUrl || item.url} ></Box>))
      }
      <button className="form-button" style={{ cursor: 'pointer' }} onClick={() => getVideos(meta.currentPage + 1)}>Load More</button>
    </div>
  </>)
}