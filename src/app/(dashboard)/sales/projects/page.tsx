// src/app/(dashboard)/sales/projects/page.tsx - Fixed version
"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FolderPlus,
  Search,
  FolderOpen,
  DollarSign,
  Calendar,
  Building,
  User,
  AlertCircle,
  FileText,
  UserPlus,
  Loader2,
  CheckCircle,
  CreditCard,
  ExternalLink,
  RefreshCw,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { SalesProjectWithClient } from "@/lib/types/api";

interface FlattenedProject {
  projectId: number;
  clientId: number; // Fixed: Added clientId field
  title: string;
  description: string;
  pricing: any;
  timeline: string;
  status: string;
  paidPercentage: number;
  documents: Array<{ documentUrl: string }>;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  clientData: SalesProjectWithClient;
}

export default function SalesProjectsPage() {
  const [projects, setProjects] = useState<SalesProjectWithClient[]>([]);
  const [flattenedProjects, setFlattenedProjects] = useState<FlattenedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<FlattenedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [assigningPM, setAssigningPM] = useState<{ [key: number]: boolean }>({});
  const [requestingPayment, setRequestingPayment] = useState<{ [key: number]: boolean }>({});
  const [assignedPMs, setAssignedPMs] = useState<Set<number>>(new Set());
  const [requestedPayments, setRequestedPayments] = useState<Set<number>>(new Set());

  // Safe function to display pricing from any format
  const formatPricing = (pricing: any): string => {
    if (!pricing && pricing !== 0) return "Price TBD";
    if (typeof pricing === "string") {
      if (
        pricing.includes("$") ||
        pricing.toLowerCase().includes("hour") ||
        pricing.toLowerCase().includes("month")
      ) {
        return pricing;
      }
      const numericPrice = parseFloat(pricing.replace(/[^\d.-]/g, ""));
      if (!isNaN(numericPrice)) {
        return `$${numericPrice.toLocaleString()}`;
      }
      return pricing;
    }
    if (typeof pricing === "number") {
      return `$${pricing.toLocaleString()}`;
    }
    return "Price TBD";
  };

  // Safe function to extract numeric value for calculations
  const extractPricingValue = (pricing: any): number => {
    if (!pricing) return 0;
    if (typeof pricing === "number") {
      return pricing;
    }
    if (typeof pricing === "string") {
      const cleanedPrice = pricing.replace(/[^\d.-]/g, "");
      const parsed = parseFloat(cleanedPrice);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Fixed: Function to get client ID from the project structure
  const getClientId = (clientData: SalesProjectWithClient): number => {
    // Use the clientId from the API response directly
    return clientData.clientId || 0;
  };

  // Function to flatten projects for table display
  const flattenProjectsData = (projectsData: SalesProjectWithClient[]): FlattenedProject[] => {
    const flattened: FlattenedProject[] = [];
    projectsData.forEach((clientData) => {
      clientData.project.forEach((project) => {
        flattened.push({
          projectId: project.id,
          clientId: clientData.clientId, // Fixed: Use clientId from API response
          title: project.title,
          description: project.description,
          pricing: project.pricing,
          timeline: project.timeline,
          status: project.status,
          paidPercentage: project.paidPercentage,
          documents: project.documents || [],
          clientName: clientData.clientName,
          company: clientData.company,
          email: clientData.email,
          phone: clientData.phone,
          clientData: clientData,
        });
      });
    });
    return flattened;
  };

  // Function to handle PM assignment
  const handleAssignPM = async (projectId: number) => {
    setAssigningPM((prev) => ({ ...prev, [projectId]: true }));
    try {
      await apiClient.assignProjectManager(projectId);
      setAssignedPMs((prev) => new Set([...prev, projectId]));
      toast({
        title: "Request Sent",
        description: "Project Manager assignment request has been sent to admin for approval.",
      });
    } catch (error) {
      console.error("Failed to assign PM:", error);
      toast({
        title: "Assignment Failed",
        description: error instanceof Error ? error.message : "Failed to send PM assignment request",
        variant: "destructive",
      });
    } finally {
      setAssigningPM((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  // Function to handle payment request
  const handleRequestPayment = async (project: FlattenedProject) => {
    setRequestingPayment((prev) => ({ ...prev, [project.projectId]: true }));
    try {
      const clientId = project.clientId; // Fixed: Use clientId directly from project
      const amount = extractPricingValue(project.pricing);
      
      if (clientId === 0) {
        throw new Error("Could not determine client ID");
      }
      if (amount === 0) {
        throw new Error("Project amount not set");
      }

      await apiClient.requestProject({ // Fixed: Use requestProject instead of requestPayment
        clientId: clientId,
        amount: amount,
      });

      setRequestedPayments((prev) => new Set([...prev, project.projectId]));
      toast({
        title: "Payment Request Sent",
        description: `Payment request for ${formatPricing(project.pricing)} has been sent to ${project.clientName}.`,
      });
    } catch (error) {
      console.error("Failed to request payment:", error);
      toast({
        title: "Payment Request Failed",
        description: error instanceof Error ? error.message : "Failed to send payment request",
        variant: "destructive",
      });
    } finally {
      setRequestingPayment((prev) => ({ ...prev, [project.projectId]: false }));
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "unpaid":
      case "on hold":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const flattened = flattenProjectsData(projects);
      setFlattenedProjects(flattened);
      // Apply search filter
      const filtered = flattened.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [projects, searchTerm]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projectsData = await apiClient.getSalesProjects();
      setProjects(projectsData);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalValue = () => {
    return filteredProjects.reduce(
      (total, project) => total + extractPricingValue(project.pricing),
      0
    );
  };

  const getUniqueClients = () => {
    const emails = new Set(filteredProjects.map((p) => p.email));
    return emails.size;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Projects Management</h1>
          <p className="text-slate-600 mt-2">View and manage all client projects</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={fetchProjects} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link href="/sales/create-project">
            <Button>
              <FolderPlus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <button
                onClick={fetchProjects}
                className="ml-2 text-sm underline hover:no-underline"
              >
                Try Again
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredProjects.length}</div>
              <p className="text-sm text-slate-500">Total Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getUniqueClients()}</div>
              <p className="text-sm text-slate-500">Active Clients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${getTotalValue().toLocaleString()}
              </div>
              <p className="text-sm text-slate-500">Total Value</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>All Projects ({filteredProjects.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Project</TableHead>
                    <TableHead className="w-[200px]">Client</TableHead>
                    <TableHead className="w-[120px]">Pricing</TableHead>
                    <TableHead className="w-[120px]">Timeline</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Payment</TableHead>
                    <TableHead className="w-[80px]">Docs</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.projectId} className="hover:bg-slate-50">
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-slate-900 mb-1">{project.title}</div>
                          <div className="text-sm text-slate-500 line-clamp-2">{project.description}</div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-slate-900">{project.clientName}</div>
                          <div className="text-sm text-slate-500">{project.company}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{project.email}</span>
                            </div>
                            <div className="mt-0.5">{project.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="font-medium text-green-600">
                          {formatPricing(project.pricing)}
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-blue-600" />
                          <span className="text-sm">{project.timeline || "TBD"}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4">
                        {project.status && (
                          <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                            {project.status}
                          </Badge>
                        )}
                      </TableCell>
                      
                      <TableCell className="py-4">
                        {project.paidPercentage !== undefined && (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              
                              <span className="text-xs font-medium text-green-600">
                                {project.paidPercentage}%
                              </span>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      
                      <TableCell className="py-4">
                        {project.documents.length > 0 ? (
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-600">{project.documents.length}</span>
                            {project.documents.length > 0 && (
                              <a
                                href={project.documents[0].documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">None</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              disabled={
                                assigningPM[project.projectId] ||
                                requestingPayment[project.projectId]
                              }
                            >
                              <span className="sr-only">Open menu</span>
                              {assigningPM[project.projectId] ||
                              requestingPayment[project.projectId] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            {/* View Payment Details - Fixed Link */}
                            <DropdownMenuItem asChild>
                              <Link href={`/sales/projects/${project.clientId}`}>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>View Payment Details</span>
                              </Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {/* Request PM Assignment */}
                            {assignedPMs.has(project.projectId) ? (
                              <DropdownMenuItem disabled>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span className="text-green-600">PM Assignment Requested</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleAssignPM(project.projectId)}
                                disabled={assigningPM[project.projectId]}
                              >
                                {assigningPM[project.projectId] ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Requesting PM Assignment...</span>
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>Request PM Assignment</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            
                            {/* Request Payment */}
                            {requestedPayments.has(project.projectId) ? (
                              <DropdownMenuItem disabled>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span className="text-green-600">Payment Request Sent</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleRequestPayment(project)}
                                disabled={
                                  requestingPayment[project.projectId] ||
                                  extractPricingValue(project.pricing) === 0
                                }
                              >
                                {requestingPayment[project.projectId] ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Sending Payment Request...</span>
                                  </>
                                ) : (
                                  <>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Request Payment</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            {/* View Documents */}
                            {project.documents.length > 0 && (
                              <DropdownMenuItem asChild>
                                <a
                                  href={project.documents[0].documentUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>View Documents ({project.documents.length})</span>
                                  <ExternalLink className="ml-auto h-3 w-3" />
                                </a>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No projects found</h3>
              <p className="text-slate-500 mb-4">
                {searchTerm
                  ? "No projects match your search criteria"
                  : "Get started by creating your first project"}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mr-2"
                >
                  Clear Search
                </Button>
              )}
              <Link href="/sales/create-project">
                <Button>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-600">
          Showing {filteredProjects.length} projects from {getUniqueClients()} clients
        </div>
      )}
    </div>
  );
}