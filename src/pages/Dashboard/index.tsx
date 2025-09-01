import { div } from "framer-motion/client";

import { Sidebar } from "../../components/sidebar/Sidebar";
import { DashBoard } from "../../components/dashboard/DashBoard";

import { useUser } from "../../hooks/useUser";

export default function Dashboard () {

    const { user, isAuthenticated } = useUser();

    if (!isAuthenticated) {
        return (
        <div className="alert alert-warning">
            Por favor, faça login para ver seus dados.
        </div>
        );
    }

    if (!user) {
        return <div>Carregando dados do usuário...</div>;
    }

    return (
         <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
            <Sidebar  Name="dashboard" />
            <DashBoard />
        </div>
    )
}