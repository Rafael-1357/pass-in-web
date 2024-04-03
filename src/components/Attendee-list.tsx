import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react'
import Dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { IconButton } from './Icon-button'
import { Table } from './table/Table'
import { TableHeader } from './table/Table-header'
import { TableCell } from './table/Table-cell'
import { TableRow } from './table/Table-row'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import { useState } from 'react'

Dayjs.extend(relativeTime)
Dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length / 10)

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPrevPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border w-72 border-white/10 rounded-lg flex items-center gap-3">
          <Search className='size-4 text-emerald-300' />
          <input className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar participante..." />
        </div>
      </div>
      <Table>
        <thead>
          <tr className='border-b border-white/10'>
            <TableHeader style={{ width: 48 }}>
              <input type="checkbox" className='size-4 bg-black/20 rounded border-white/10 ' />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((Attendee) => {
            return (
              <TableRow key={Attendee.id} className='border-b border-white/10 hover:bg-white/5'>
                <TableCell>
                  <input type="checkbox" className='size-4 bg-black/20 rounded border-white/10' name="" id="" />
                </TableCell>
                <TableCell>{Attendee.id}</TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-white'>{Attendee.name}</span>
                    <span>{Attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(Attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(Attendee.checkedInAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className='size-4' />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length} items
            </TableCell>
            <td className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
                <span>Página {page} de {totalPages}</span>
                <div className='flex gap-1.5'>
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className='size-4' />
                  </IconButton>
                  <IconButton onClick={goToPrevPage} disabled={page === 1}>
                    <ChevronLeft className='size-4' />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className='size-4' />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className='size-4' />
                  </IconButton>
                </div>
              </div>
            </td>
          </TableRow>
        </tfoot>
      </Table>
    </div >
  )
}