import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    
} from "@nextui-org/react";

type Props = {
    data: any;
};

export default function GpsData({ data }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <Table>
                <TableHeader>
                    <TableColumn className="text-right">latitude</TableColumn>
                    <TableColumn className="text-right">longitude</TableColumn>
                    <TableColumn className="text-right">noOfSatellitesInUse</TableColumn>
                    <TableColumn className="text-right">noOfSatellitesInView</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.data.map((elem: any) => {
                        return (
                            <TableRow
                                key={elem.sector}
                                className="font-heeborounded-full"
                            >
                                <TableCell className="font-bold">{elem.latitude}</TableCell>
                                <TableCell className="font-bold">{elem.longitude}</TableCell>
                                <TableCell className="font-bold">{elem.noOfSatellitesInUse}</TableCell>
                                <TableCell className="font-bold">{elem.noOfSatellitesInView}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
