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

export default function StMmeData({ data }: Props) {
    
    return (
        <div className="flex flex-col gap-3 p-2">
            <Table>
                <TableHeader>
                    <TableColumn className="text-right">mme name</TableColumn>
                    <TableColumn className="text-right">admState</TableColumn>
                    <TableColumn className="text-right">opState</TableColumn>
                    <TableColumn className="text-right">proxy</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.data.map((elem: any) => {
                        const admState=elem.admState.includes("UNLOCKED")?"פתוח":"נעול";
                        const admStateCss=elem.admState.includes("UNLOCKED")?"text-green-400 dark:text-green-600 font-bold":"text-red-400 dark:text-red-600 font-bold";
                        
                        const opState=elem.opState.includes("ENABLED")?"למעלה":"למטה";
                        const opStateCss=elem.opState.includes("ENABLED")?"text-green-400 dark:text-green-600 font-bold":"text-red-400 dark:text-red-600 font-bold";
                        
                        return (
                            <TableRow
                                key={elem.sector}
                                className="rounded-full"
                            >
                                <TableCell className="font-bold">{elem.mmeName}</TableCell>
                                <TableCell className={admStateCss}>{admState}</TableCell>
                                <TableCell className={opStateCss}>{opState}</TableCell>
                                <TableCell className="font-bold">{elem.proxy}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
