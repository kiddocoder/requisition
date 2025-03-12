import React, { useState } from "react";
import { RequisitionModal } from "../components/forms/requisition/RequistionModal";

function Requisition(): React.ReactElement {
    const [isModalOPened, setIsModalOPened] = useState<boolean>(false)
    return (
        <div>
            <RequisitionModal onClose={() => setIsModalOPened(false)} />
        </div>
    )
}

export default Requisition;
