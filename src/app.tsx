import { Button, H1 } from "./styles";
import { Plus, Filter } from "lucide-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "./ui/pagination";
import { useState } from "react";

export interface UsersResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Users[];
}

export interface Users {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  id: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  const [filter, setFilter] = useState(urlFilter)

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data, isLoading, isError, refetch } = useQuery<UsersResponse>({
    queryKey: ["get-users", filter, page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/users?_page=${page}&_per_page=10&email=${urlFilter}`);
      const data = await response.json();

      return data;
    },
    placeholderData: keepPreviousData
  });

  function handleFilter() {
    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  return (
    <div>
      <div>header</div>
      <main>
        <div>
          <H1>Tags</H1>
          <Button>
            <Plus style={{ height: "10px" }} /> Create New
          </Button>
        </div><br /><br />
        <div>
          <input type="text" placeholder="Search users" onChange={e => setFilter(e.target.value)} value={filter} />
          <button onClick={handleFilter}>
            <Filter size="10"></Filter>
          </button>
        </div>

        {/* Renderização condicional com base no estado da consulta */}
        <div>
          {data?.data.map(user => (
            <div key={user.userId}>
              <ul>
                <li style={{ color: "#ffffff" }}>{user.username}</li>
                <li style={{ color: "#ffffff" }}>{user.email}</li>
                <li style={{ color: "#ffffff" }}>{user.avatar}</li>
                <li style={{ color: "#ffffff" }}>{user.password}</li>
              </ul>
            </div>
          ))}
        </div>

        {data && <Pagination pages={data.pages} items={data.items} page={page} itemsPerPage={10}/>}
      </main>
    </div>
  );
}

export default App;


// import { Button, H1 } from "./styles";
// import { Plus } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router-dom";

// import { Pagination } from "./components/pagination";

// export interface UsersResponse {
//   first: number;
//   prev: number | null;
//   next: number;
//   last: number;
//   pages: number;
//   items: number;
//   data: Users[];
// }

// export interface Users {
//   userId: string;
//   username: string;
//   email: string;
//   avatar: string;
//   password: string;
//   id: string;
// }

// function App() {
//   const [searchParams] = useSearchParams()

//   const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

//   const { data, isLoading, isError, refetch } = useQuery<UsersResponse>({
//     queryKey: ["get-users", page],
//     queryFn: async () => {
//       const response = await fetch(`http://localhost:3333/users?_page=${page}&_per_page=10`);
//       const data = await response.json();

//       console.log(data);

//       return data;
//     },
//     enabled: false, // Desabilita a solicitação automática
//   });

//   const handleRefresh = () => {
//     refetch(); // Re-faz a solicitação ao servidor
//   };

//   return (
//     <div>
//       <div>header</div>
//       <main>
//         <div>
//           <H1>Tags</H1>
//           <Button onClick={handleRefresh}>
//             <Plus style={{ height: "10px" }} /> Create New
//           </Button>
//         </div>
//         <br />
//         <br />

//         {/* Renderização condicional com base no estado da consulta */}
//         <div>
//           {data?.data.map(user => (
//             <div key={user.userId}>
//               <ul>
//                 <li style={{ color: "#ffffff" }}>{user.username}</li>
//                 <li style={{ color: "#ffffff" }}>{user.email}</li>
//                 <li style={{ color: "#ffffff" }}>{user.avatar}</li>
//                 <li style={{ color: "#ffffff" }}>{user.password}</li>
//               </ul>
//             </div>
//           ))}
//         </div>

//         {data && <Pagination pages={data.pages} items={data.items} page={page}/>}
//       </main>
//     </div>
//   );
// }

// export default App;
