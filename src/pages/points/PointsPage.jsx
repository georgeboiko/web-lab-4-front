import { PointForm } from "../../features/point/ui/pointForm/PointForm";
import { PointTable } from "../../features/point/ui/pointTable/PointTable";
import { Navbar } from "../../widgets/navbar/ui/Navbar";

const PointsPage = () => {
    return (
        <div>
            <Navbar/>
            <PointForm/>
            <PointTable/>
        </div>
    );
};

export default PointsPage;
