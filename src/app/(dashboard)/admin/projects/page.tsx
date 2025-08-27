// src/app/(dashboard)/admin/projects/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  FolderOpen,
  Search,
  Filter,
  DollarSign,
  Clock,
  User,
  Building,
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  MoreHorizontal,
  Eye,
  UserPlus,
  ExternalLink,
  Loader2,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  client: {
    id: number;
    clientName: string;
    company: string;
    email: string;
    phone: string;
    projects: string[];
  } | null;
  clientId: number;
  description: string;
  pricing: number;
  timeline: string;
  status: string;
  salespersonId: number;
  paidPercentage: number;
  percentage: number;
  pmId: number;
  documents: Array<{
    id: number;
    documentUrl: string;
  }>;
}

interface ProjectManager {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: number;
}

export default function AllProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [projectManagers, setProjectManagers] = useState<ProjectManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pmFilter, setPmFilter] = useState<string>("all");
  const [assigningPM, setAssigningPM] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter, pmFilter]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch projects and PMs in parallel
      const [projectsData, pmsData] = await Promise.all([
        apiClient.getAllProjects(),
        apiClient.getPMs().catch(() => []), // Don't fail if PMs can't be fetched
      ]);

      setProjects(projectsData);
      setProjectManagers(pmsData);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to load projects");
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
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.client?.clientName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.client?.company
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // PM filter
    if (pmFilter !== "all") {
      if (pmFilter === "unassigned") {
        filtered = filtered.filter((project) => project.pmId === 0);
      } else {
        filtered = filtered.filter(
          (project) => project.pmId === parseInt(pmFilter)
        );
      }
    }

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="h-3 w-3" />;
      case "unpaid":
        return <XCircle className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "completed":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getPMName = (pmId: number) => {
    if (pmId === 0)
      return (
        <Badge
          variant="outline"
          className="text-xs mt-1 text-orange-600 border-orange-200"
        >
          Unassinged
        </Badge>
      );
    const pm = projectManagers.find((pm) => pm.id === pmId);
    return pm ? pm.name : `PM #${pmId}`;
  };

  const assignProjectManager = async (projectId: number) => {
    setAssigningPM((prev) => ({ ...prev, [projectId]: true }));

    try {
      await apiClient.assignProjectManager(projectId);
      // Refresh the projects list
      await fetchData();
    } catch (error) {
      console.error("Failed to assign PM:", error);
    } finally {
      setAssigningPM((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const getUniqueStatuses = () => {
    const statuses = [...new Set(projects.map((p) => p.status))];
    return statuses.filter((status) => status && status.trim() !== "");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FolderOpen className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                All Projects
              </h1>
              <p className="text-slate-600 mt-1">
                Manage and monitor all projects in the system
              </p>
            </div>
          </div>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={fetchData}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-800">
                  {projects.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(
                    projects.reduce((sum, p) => sum + p.pricing, 0)
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-slate-600">Paid Projects</p>
                <p className="text-2xl font-bold text-slate-800">
                  {
                    projects.filter((p) => p.status.toLowerCase() === "paid")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">Unassigned</p>
                <p className="text-2xl font-bold text-slate-800">
                  {projects.filter((p) => p.pmId === 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects by title, description, client name, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {getUniqueStatuses().map((status) => (
              <SelectItem key={status} value={status.toLowerCase()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={pmFilter} onValueChange={setPmFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All PMs</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {projectManagers.map((pm) => (
              <SelectItem key={pm.id} value={pm.id.toString()}>
                {pm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center">
              <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                No Projects Found
              </h3>
              <p className="text-slate-500">
                {projects.length === 0
                  ? "No projects have been created yet."
                  : "No projects match your current filters."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Project</TableHead>

                    <TableHead className="w-[120px]">Pricing</TableHead>
                    <TableHead className="w-[120px]">Timeline</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[150px]">Project Manager</TableHead>
                    <TableHead className="w-[120px]">
                      Price Percentage
                    </TableHead>
                    <TableHead className="w-[80px]">Docs</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
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
                        <div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(project.pricing)}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {project.paidPercentage}% paid
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-blue-600" />
                          <span className="text-sm">{project.timeline}</span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <Badge
                          className={`${getStatusColor(
                            project.status
                          )} border text-xs flex items-center space-x-1 w-fit`}
                        >
                          {getStatusIcon(project.status)}
                          <span>{project.status}</span>
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3 text-slate-400" />
                          <span className="text-sm font-medium">
                            {getPMName(project.pmId)}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>{project.percentage}%</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        {project.documents.length > 0 ? (
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-600">
                              {project.documents.length}
                            </span>
                            <a
                              href={project.documents[0].documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-800"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
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
                              disabled={assigningPM[project.id]}
                            >
                              <span className="sr-only">Open menu</span>
                              {assigningPM[project.id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                              Project Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {/* View Project Details */}
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Project Details</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/admin/projects/${project.clientId}`}
                              >
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>View Payment Details</span>
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem disabled>
                              <User className="mr-2 h-4 w-4" />
                              <span>
                                Sales Person ID: {project.salespersonId}
                              </span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Assign Project Manager */}
                            {project.pmId === 0 ? (
                              <DropdownMenuItem
                                onClick={() => assignProjectManager(project.id)}
                                disabled={assigningPM[project.id]}
                              >
                                {assigningPM[project.id] ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Assigning Project Manager...</span>
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>Assign Project Manager</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem disabled>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span className="text-green-600">
                                  PM Already Assigned
                                </span>
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />

                            {/* View Documents */}
                            {project.documents.length > 0 && (
                              <>
                                {project.documents
                                  .slice(0, 3)
                                  .map((doc, index) => (
                                    <DropdownMenuItem key={doc.id} asChild>
                                      <a
                                        href={doc.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                      >
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>Document {index + 1}</span>
                                        <ExternalLink className="ml-auto h-3 w-3" />
                                      </a>
                                    </DropdownMenuItem>
                                  ))}
                                {project.documents.length > 3 && (
                                  <DropdownMenuItem disabled>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>
                                      +{project.documents.length - 3} more
                                      documents
                                    </span>
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="mt-6 text-center text-sm text-slate-600">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      )}
    </div>
  );
}
