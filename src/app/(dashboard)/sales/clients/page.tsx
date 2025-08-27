// src/app/(dashboard)/sales/clients/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-config'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { UserPlus, Search, Mail, Users } from 'lucide-react'
import Link from 'next/link'
import { SalesClient } from '@/lib/types/api'

export default function SalesClientsPage() {
  const [clients, setClients] = useState<SalesClient[]>([])
  const [filteredClients, setFilteredClients] = useState<SalesClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    const filtered = clients.filter(client =>
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredClients(filtered)
  }, [clients, searchTerm])

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      const clientsData = await apiClient.getSalesClients()
      setClients(clientsData)
      setFilteredClients(clientsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      setError('Failed to fetch clients')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Client Management</h1>
          <p className="text-slate-600 mt-2">Manage your clients and their information</p>
        </div>
        <Link href="/sales/add-client">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchClients}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search clients by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>All Clients ({filteredClients.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredClients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">#{client.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span>{client.email}</span>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Projects
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No clients found</h3>
              <p className="text-slate-500 mb-4">
                {searchTerm ? 'No clients match your search' : 'Get started by adding your first client'}
              </p>
              <Link href="/sales/add-client">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add First Client
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}