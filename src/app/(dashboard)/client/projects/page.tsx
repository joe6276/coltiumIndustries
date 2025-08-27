// src/app/(dashboard)/client/projects/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FolderOpen,
  Calendar,
  DollarSign,
  FileText,
  Download,
  CreditCard,
  ExternalLink,
  MoreHorizontal,
  User,
  RefreshCw,
  Search,
  Eye,
  MessageCircle,
  CheckCircle,
  Clock,
  Play,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { ClientProject } from "@/lib/types/api";

export default function ClientProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ClientProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (user?.email) {
      fetchProjects();
    }
  }, [user]);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projectsData = await apiClient.getClientProjects(user!.email);
      setProjects(projectsData);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to load your projects");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => {
        const status = getProjectStatus(project);
        return status.status.toLowerCase().replace(" ", "-") === statusFilter;
      });
    }
    setFilteredProjects(filtered);
  };

  const getProjectStatus = (project: ClientProject) => {
    // Simple status logic based on project title/description
    if (
      project.title.toLowerCase().includes("completed") ||
      project.description.toLowerCase().includes("completed")
    ) {
      return {
        status: "Completed",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      };
    }
    if (
      project.title.toLowerCase().includes("progress") ||
      project.description.toLowerCase().includes("progress")
    ) {
      return {
        status: "In Progress",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      };
    }
    return {
      status: "Active",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Play,
    };
  };

  // Calculate upfront payment amount for a project
  const calculateUpfrontAmount = (project: ClientProject) => {
    // Handle both number and string pricing
    let pricing = 0;
    if (typeof project.pricing === "number") {
      pricing = project.pricing;
    } else if (typeof project.pricing === "string") {
      pricing = parseFloat(project.pricing.replace(/[^0-9.]/g, "")) || 0;
    }
    const percentage = (project as any).percentage || 30; // Default 30%
    return (pricing * percentage) / 100;
  };

  const formatCurrency = (pricing: string | number) => {
    // Handle both number and string pricing
    let amount = 0;
    if (typeof pricing === "number") {
      amount = pricing;
    } else if (typeof pricing === "string") {
      // Handle pre-formatted strings or parse numeric strings
      amount = parseFloat(pricing.replace(/[^0-9.]/g, "")) || 0;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get the current user's client ID for payment details
  const getCurrentClientId = () => {
    // Get clientId from the first project (all projects should have the same clientId for this user)
    if (projects.length > 0) {
      return projects[0].clientId;
    }
    // Fallback if no projects are loaded yet
    return user?.id || 1;
  };

  const completedProjects = projects.filter(
    (p) => getProjectStatus(p).status === "Completed"
  ).length;
  const inProgressProjects = projects.filter(
    (p) => getProjectStatus(p).status === "In Progress"
  ).length;
  const activeProjects = projects.filter(
    (p) => getProjectStatus(p).status === "Active"
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/2 md:w-1/3"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 md:h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
            <FolderOpen className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-3xl font-bold text-slate-800 truncate">My Projects</h1>
              <p className="text-sm md:text-base text-slate-600 truncate">
                Track progress and manage your projects
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Link href={`/client/projects/${getCurrentClientId()}`} className="flex-1 sm:flex-none">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Receipt className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">View Payment Details</span>
                <span className="sm:hidden">Payments</span>
              </Button>
            </Link>
            <Button onClick={fetchProjects} variant="outline" size="sm" className="flex-1 sm:flex-none">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm md:text-base">{error}</p>
          <button
            onClick={fetchProjects}
            className="mt-2 text-xs md:text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Dashboard - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <FolderOpen className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-slate-600 truncate">Total Projects</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">
                  {projects.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Play className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-slate-600 truncate">Active</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">
                  {activeProjects}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-slate-600 truncate">In Progress</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">
                  {inProgressProjects}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-slate-600 truncate">Completed</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">
                  {completedProjects}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="space-y-3 md:space-y-0 md:flex md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Display - Card View on Mobile, Table on Desktop */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Projects ({filteredProjects.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center px-4">
              {projects.length === 0 ? (
                <>
                  <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">
                    No projects found
                  </h3>
                  <p className="text-slate-500 mb-4 text-sm md:text-base">
                    Your projects will appear here once they are created by our
                    sales team.
                  </p>
                  <Link href="/client/support">
                    <Button>Contact Support</Button>
                  </Link>
                </>
              ) : (
                <>
                  <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base">
                    No projects match your search criteria.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Mobile Card View - Hidden on Desktop */}
              <div className="block md:hidden">
                <div className="divide-y divide-slate-200">
                  {filteredProjects.map((project) => {
                    const projectStatus = getProjectStatus(project);
                    const upfrontAmount = calculateUpfrontAmount(project);
                    
                    return (
                      <div key={project.id} className="p-4 space-y-3">
                        {/* Project Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-slate-900 truncate">
                              {project.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                              {project.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 ml-2 flex-shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64">
                              <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              
                              {/* View Payment Details */}
                              <DropdownMenuItem asChild>
                                <Link href={`/client/projects/${getCurrentClientId()}`}>
                                  <Receipt className="mr-2 h-4 w-4" />
                                  <span>View Payment Details</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              
                              {/* Contact PM */}
                              <DropdownMenuItem>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                <span>Contact Project Manager</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              
                              {/* Documents Section */}
                              {(project.documents && project.documents.length > 0) ||
                               (project.reportDocuments && project.reportDocuments.length > 0) ? (
                                <>
                                  <DropdownMenuLabel>
                                    Documents ({(project.documents?.length || 0) + (project.reportDocuments?.length || 0)})
                                  </DropdownMenuLabel>
                                  
                                  {/* Regular Documents */}
                                  {project.documents && project.documents.length > 0 && (
                                    <>
                                      <DropdownMenuLabel className="text-xs text-slate-500 font-normal">
                                        Project Documents ({project.documents.length})
                                      </DropdownMenuLabel>
                                      {project.documents.map((doc, index) => (
                                        <DropdownMenuItem
                                          key={`doc-${index}`}
                                          className="flex items-center justify-between"
                                        >
                                          <div className="flex items-center flex-1">
                                            <FileText className="mr-2 h-3 w-3 text-blue-600" />
                                            <span className="text-sm">Document {index + 1}</span>
                                          </div>
                                          <div className="flex space-x-1">
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(doc.documentUrl, "_blank");
                                              }}
                                            >
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const a = document.createElement("a");
                                                a.href = doc.documentUrl;
                                                a.download = `project-${project.id}-doc-${index + 1}`;
                                                a.click();
                                              }}
                                            >
                                              <Download className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </DropdownMenuItem>
                                      ))}
                                    </>
                                  )}
                                  
                                  {/* Report Documents */}
                                  {project.reportDocuments && project.reportDocuments.length > 0 && (
                                    <>
                                      <DropdownMenuLabel className="text-xs text-slate-500 font-normal">
                                        Report Documents ({project.reportDocuments.length})
                                      </DropdownMenuLabel>
                                      {project.reportDocuments.map((doc, index) => (
                                        <DropdownMenuItem
                                          key={`report-${index}`}
                                          className="flex items-center justify-between"
                                        >
                                          <div className="flex items-center flex-1">
                                            <FileText className="mr-2 h-3 w-3 text-green-600" />
                                            <span className="text-sm">Report {index + 1}</span>
                                          </div>
                                          <div className="flex space-x-1">
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(doc.documentUrl, "_blank");
                                              }}
                                            >
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const a = document.createElement("a");
                                                a.href = doc.documentUrl;
                                                a.download = `project-${project.id}-report-${index + 1}`;
                                                a.click();
                                              }}
                                            >
                                              <Download className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </DropdownMenuItem>
                                      ))}
                                    </>
                                  )}
                                  <DropdownMenuSeparator />
                                </>
                              ) : (
                                <>
                                  <DropdownMenuItem disabled>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>No documents available</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              
                              {/* Project Info */}
                              <DropdownMenuItem disabled>
                                <FolderOpen className="mr-2 h-4 w-4" />
                                <span>Project ID: {project.id}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>Value: {formatCurrency(project.pricing)}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Timeline: {project.timeline}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>
                                  Upfront: ${upfrontAmount.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                          <Badge className={`${projectStatus.color} border text-xs`}>
                            {project.status}
                          </Badge>
                        </div>

                        {/* Project Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-600 truncate">
                              {formatCurrency(project.pricing)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-orange-600" />
                            <span className="font-medium text-orange-600 truncate">
                              ${upfrontAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })} upfront
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <span className="truncate">{project.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3 text-purple-600" />
                            <span className="truncate">
                              {(project.documents?.length || 0) + (project.reportDocuments?.length || 0)} files
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                          <Link href={`/client/payments?project=${project.id}`}>
                            <Button size="sm" className="w-full">
                              <CreditCard className="h-3 w-3 mr-2" />
                              Make Payment
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Table View - Hidden on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Project</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[150px]">Upfront Payment</TableHead>
                      <TableHead className="w-[120px]">Value</TableHead>
                      <TableHead className="w-[120px]">Timeline</TableHead>
                      <TableHead className="w-[100px]">Documents</TableHead>
                      <TableHead className="w-[200px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => {
                      const projectStatus = getProjectStatus(project);
                      const upfrontAmount = calculateUpfrontAmount(project);
                      return (
                        <TableRow key={project.id} className="hover:bg-slate-50">
                          <TableCell className="py-4">
                            <div>
                              <div className="font-medium text-slate-900 mb-1">
                                {project.title}
                              </div>
                              <div className="text-sm text-slate-500 line-clamp-2">
                                {project.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge
                              className={`${projectStatus.color} border text-xs flex items-center space-x-1 w-fit`}
                            >
                              <span>{project.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <span className="font-medium text-orange-600 text-sm">
                                  ${upfrontAmount.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-green-600 text-sm">
                                {formatCurrency(project.pricing)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-blue-600" />
                              <span className="text-sm">{project.timeline}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-1">
                              <FileText className="h-3 w-3 text-purple-600" />
                              <span className="text-sm font-medium">
                                {(project.documents?.length || 0) +
                                  (project.reportDocuments?.length || 0)}{" "}
                                files
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2">
                              <Link href={`/client/payments?project=${project.id}`}>
                                <Button size="sm" className="text-xs">
                                  <CreditCard className="h-3 w-3 mr-1" />
                                  Pay
                                </Button>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64">
                                  <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  
                                  {/* View Payment Details */}
                                  <DropdownMenuItem asChild>
                                    <Link href={`/client/projects/${getCurrentClientId()}`}>
                                      <Receipt className="mr-2 h-4 w-4" />
                                      <span>View Payment Details</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  
                                  {/* Contact PM */}
                                  <DropdownMenuItem>
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    <span>Contact Project Manager</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {/* Documents Section */}
                                  {(project.documents && project.documents.length > 0) ||
                                   (project.reportDocuments && project.reportDocuments.length > 0) ? (
                                    <>
                                      <DropdownMenuLabel>
                                        Documents ({(project.documents?.length || 0) + (project.reportDocuments?.length || 0)})
                                      </DropdownMenuLabel>
                                      
                                      {/* Regular Documents */}
                                      {project.documents && project.documents.length > 0 && (
                                        <>
                                          <DropdownMenuLabel className="text-xs text-slate-500 font-normal">
                                            Project Documents ({project.documents.length})
                                          </DropdownMenuLabel>
                                          {project.documents.map((doc, index) => (
                                            <DropdownMenuItem
                                              key={`doc-${index}`}
                                              className="flex items-center justify-between"
                                            >
                                              <div className="flex items-center flex-1">
                                                <FileText className="mr-2 h-3 w-3 text-blue-600" />
                                                <span className="text-sm">Document {index + 1}</span>
                                              </div>
                                              <div className="flex space-x-1">
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  className="h-6 w-6 p-0"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(doc.documentUrl, "_blank");
                                                  }}
                                                >
                                                  <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  className="h-6 w-6 p-0"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const a = document.createElement("a");
                                                    a.href = doc.documentUrl;
                                                    a.download = `project-${project.id}-doc-${index + 1}`;
                                                    a.click();
                                                  }}
                                                >
                                                  <Download className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </DropdownMenuItem>
                                          ))}
                                        </>
                                      )}
                                      
                                      {/* Report Documents */}
                                      {project.reportDocuments && project.reportDocuments.length > 0 && (
                                        <>
                                          <DropdownMenuLabel className="text-xs text-slate-500 font-normal">
                                            Report Documents ({project.reportDocuments.length})
                                          </DropdownMenuLabel>
                                          {project.reportDocuments.map((doc, index) => (
                                            <DropdownMenuItem
                                              key={`report-${index}`}
                                              className="flex items-center justify-between"
                                            >
                                              <div className="flex items-center flex-1">
                                                <FileText className="mr-2 h-3 w-3 text-green-600" />
                                                <span className="text-sm">Report {index + 1}</span>
                                              </div>
                                              <div className="flex space-x-1">
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  className="h-6 w-6 p-0"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(doc.documentUrl, "_blank");
                                                  }}
                                                >
                                                  <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  className="h-6 w-6 p-0"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const a = document.createElement("a");
                                                    a.href = doc.documentUrl;
                                                    a.download = `project-${project.id}-report-${index + 1}`;
                                                    a.click();
                                                  }}
                                                >
                                                  <Download className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </DropdownMenuItem>
                                          ))}
                                        </>
                                      )}
                                      <DropdownMenuSeparator />
                                    </>
                                  ) : (
                                    <>
                                      <DropdownMenuItem disabled>
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>No documents available</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                    </>
                                  )}
                                  
                                  {/* Project Info */}
                                  <DropdownMenuItem disabled>
                                    <FolderOpen className="mr-2 h-4 w-4" />
                                    <span>Project ID: {project.id}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    <span>Value: {formatCurrency(project.pricing)}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Timeline: {project.timeline}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    <span>
                                      Upfront: ${calculateUpfrontAmount(project).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="text-center text-xs md:text-sm text-slate-600 px-4">
          Showing {filteredProjects.length} of {projects.length} projects
          {statusFilter !== "all" && (
            <span> • Filtered by: {statusFilter.replace("-", " ")}</span>
          )}
        </div>
      )}
    </div>
  );
}